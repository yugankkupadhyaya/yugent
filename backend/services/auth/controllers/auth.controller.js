import crypto from 'crypto';
import User from '../model/user.model.js';
import redis from '../../../shared/redis/redis.js';

const DEFAULT_INTERVIEW_COINS = 150;

const ACTION_COIN_COSTS = {
  'resume-analysis': 25,
  'resume-builder-download': 10,
  'download-pdf': 10,
};

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days
const SESSION_COOKIE = 'session';
const SESSION_PREFIX = 'session:';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
};

const sessionKey = (sessionId) => `${SESSION_PREFIX}${sessionId}`;

const buildSessionPayload = (user) => ({
  userId: user._id.toString(),
  name: user.name,
  email: user.email,
  interviewCoin: user.interviewCoin,
});

const createSession = async (user) => {
  const sessionId = crypto.randomUUID();
  const payload = buildSessionPayload(user);
  await redis.set(sessionKey(sessionId), JSON.stringify(payload), 'EX', SESSION_TTL_SECONDS);
  return { sessionId, payload };
};

const refreshSession = async (sessionId, user) => {
  const payload = buildSessionPayload(user);
  await redis.set(sessionKey(sessionId), JSON.stringify(payload), 'EX', SESSION_TTL_SECONDS);
  return payload;
};

const getSession = async (req) => {
  const sessionId = req.cookies?.[SESSION_COOKIE];
  if (!sessionId) return null;
  try {
    const raw = await redis.get(sessionKey(sessionId));
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const setSessionCookie = (res, sessionId) => {
  res.cookie(SESSION_COOKIE, sessionId, {
    ...cookieOptions,
    maxAge: SESSION_TTL_SECONDS * 1000,
  });
};

const sendServerError = (res, error) => {
  console.error('Auth service error:', error?.message || error);
  const isDatabaseError = error?.name?.includes('Mongoose') || error?.name === 'MongoServerError';
  return res.status(500).json({
    success: false,
    message: isDatabaseError ? 'Database unavailable. Please try again later.' : 'Server error. Please try again later.',
  });
};

const getClerkProfile = (req) => {
  const clerkUserId = req.headers['x-clerk-user-id'];
  const email = req.headers['x-clerk-email'];
  const headerName = req.headers['x-clerk-name'];
  const fallbackName = email?.split('@')?.[0] || 'Yugent User';
  const name = headerName || fallbackName;

  return { clerkUserId, email, name };
};

const getOrCreateUser = async (req) => {
  const { clerkUserId, email, name } = getClerkProfile(req);

  if (!clerkUserId) {
    const error = new Error('Unauthorized');
    error.statusCode = 401;
    throw error;
  }

  if (!email) {
    const error = new Error('User profile information is missing.');
    error.statusCode = 400;
    throw error;
  }

  let user = await User.findOne({ clerkUserId });
  if (!user) {
    try {
      return await User.create({ clerkUserId, email, name });
    } catch (error) {
      // A concurrent first login may win the unique clerkUserId index.
      if (error?.code !== 11000) throw error;
      user = await User.findOne({ clerkUserId });
      if (!user) throw error;
    }
  }

  if (user.email !== email || user.name !== name) {
    user.email = email;
    user.name = name;
    await user.save();
  }

  if (!Number.isFinite(user.interviewCoin)) {
    user.interviewCoin = DEFAULT_INTERVIEW_COINS;
    await user.save();
  }

  return user;
};

const handleAuthError = (res, error) => {
  if (error?.statusCode) {
    return res.status(error.statusCode).json({ success: false, message: error.message });
  }
  return sendServerError(res, error);
};

export const login = async (req, res) => {
  try {
    const user = await getOrCreateUser(req);
    const { sessionId, payload } = await createSession(user);
    setSessionCookie(res, sessionId);
    return res.json({ success: true, user: payload });
  } catch (error) {
    return handleAuthError(res, error);
  }
};

export const me = async (req, res) => {
  try {
    const user = await getOrCreateUser(req);
    const sessionId = req.cookies?.[SESSION_COOKIE];
    const existing = sessionId ? await getSession(req) : null;
    if (existing) {
      await refreshSession(sessionId, user);
    } else {
      const { sessionId: newSessionId, payload } = await createSession(user);
      setSessionCookie(res, newSessionId);
      return res.json({ success: true, user: payload });
    }
    return res.json({ success: true, user: buildSessionPayload(user) });
  } catch (error) {
    return handleAuthError(res, error);
  }
};

export const logout = async (req, res) => {
  try {
    const sessionId = req.cookies?.[SESSION_COOKIE];
    if (sessionId) {
      try {
        await redis.del(sessionKey(sessionId));
      } catch (error) {
        console.error('Failed to delete session from Redis:', error?.message || error);
      }
    }
    res.clearCookie(SESSION_COOKIE, cookieOptions);
    return res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    return sendServerError(res, error);
  }
};

export const useInterviewCoins = async (req, res) => {
  try {
    const { coins, action } = req.body;
    const cost = ACTION_COIN_COSTS[action] ?? Number(coins);

    if (!Number.isFinite(cost) || cost <= 0) {
      return res.status(400).json({ success: false, message: 'Valid coins are required' });
    }

    const user = await getOrCreateUser(req);
    if (user.interviewCoin < cost) {
      return res.status(403).json({ success: false, message: 'Not enough interview coins', interviewCoin: user.interviewCoin });
    }

    user.interviewCoin -= cost;
    await user.save();

    const sessionId = req.cookies?.[SESSION_COOKIE];
    if (sessionId) {
      await refreshSession(sessionId, user);
    }

    return res.json({
      success: true,
      message: 'Interview coins updated successfully',
      action,
      coins: cost,
      interviewCoin: user.interviewCoin,
    });
  } catch (error) {
    return handleAuthError(res, error);
  }
};

export const addCoins = async (req, res) => {
  try {
    const { coins } = req.body;
    if (!Number.isFinite(Number(coins)) || Number(coins) <= 0) {
      return res.status(400).json({ success: false, message: 'Valid coins are required' });
    }
    const user = await getOrCreateUser(req);
    user.interviewCoin += Number(coins);
    await user.save();

    const sessionId = req.cookies?.[SESSION_COOKIE];
    if (sessionId) {
      await refreshSession(sessionId, user);
    }

    return res.json({ success: true, message: 'Coins added successfully', interviewCoin: user.interviewCoin });
  } catch (error) {
    return handleAuthError(res, error);
  }
};
