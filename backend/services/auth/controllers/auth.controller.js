import crypto from 'crypto';

import User from '../model/user.model.js';
import redis from '../../../shared/redis/redis.js';

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

const sessionPayload = (user) => ({
  userId: user._id,
  clerkUserId: user.clerkUserId,
  name: user.name,
  email: user.email,
  interviewCoin: user.interviewCoin,
});

const writeSession = async (sessionId, user) => {
  await redis.set(`session:${sessionId}`, JSON.stringify(sessionPayload(user)), 'EX', SESSION_TTL_SECONDS);
};

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: SESSION_TTL_SECONDS * 1000,
};

const sendServerError = (res, error) => {
  console.error('Auth service error:', error?.message || error);
  const isDatabaseError = error?.name?.includes('Mongoose') || error?.name === 'MongoServerError';
  return res.status(500).json({
    success: false,
    message: isDatabaseError ? 'Database unavailable. Please try again later.' : 'Server error. Please try again later.',
  });
};

export const login = async (req, res) => {
  try {
    const clerkUserId = req.headers['x-clerk-user-id'];
    const email = req.headers['x-clerk-email'];
    const name = req.headers['x-clerk-name'];

    if (!clerkUserId) return res.status(401).json({ success: false, message: 'Unauthorized' });
    if (!email || !name) {
      return res.status(400).json({ success: false, message: 'User profile information is missing.' });
    }

    let user = await User.findOne({ clerkUserId });
    if (!user) {
      try {
        user = await User.create({ clerkUserId, email, name });
      } catch (error) {
        // A concurrent first login may win the unique clerkUserId index.
        if (error?.code !== 11000) throw error;
        user = await User.findOne({ clerkUserId });
        if (!user) throw error;
      }
    } else if (user.email !== email || user.name !== name) {
      // Keep the Clerk profile current without touching interviewCoin.
      user.email = email;
      user.name = name;
      await user.save();
    }

    const existingSessionId = req.cookies?.session;
    if (existingSessionId) {
      const existingSession = await redis.get(`session:${existingSessionId}`);
      if (existingSession && String(JSON.parse(existingSession).userId) === String(user._id)) {
        await writeSession(existingSessionId, user);
        return res.json({ success: true, user });
      }
    }

    const sessionId = crypto.randomUUID();
    await writeSession(sessionId, user);
    res.cookie('session', sessionId, cookieOptions);
    return res.json({ success: true, user });
  } catch (error) {
    return sendServerError(res, error);
  }
};

export const me = async (req, res) => {
  try {
    const clerkUserId = req.headers['x-clerk-user-id'];
    if (!clerkUserId) return res.status(401).json({ success: false, message: 'Unauthorized' });
    const sessionData = await getSessionUser(req);
    if (!sessionData) return res.status(401).json({ success: false, message: 'Application session expired.' });
    const user = await User.findOne({ clerkUserId });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    return res.json({ success: true, user });
  } catch (error) {
    return sendServerError(res, error);
  }
};

export const logout = async (req, res) => {
  try {
    if (req.cookies?.session) await redis.del(`session:${req.cookies.session}`);
    res.clearCookie('session', cookieOptions);
    return res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    return sendServerError(res, error);
  }
};

const getSessionUser = async (req) => {
  const sessionId = req.cookies?.session;
  if (!sessionId) return null;
  const session = await redis.get(`session:${sessionId}`);
  if (!session) return null;
  const sessionData = JSON.parse(session);
  // Bind the application session to the Clerk identity authenticated by the gateway.
  if (!req.headers['x-clerk-user-id'] || sessionData.clerkUserId !== req.headers['x-clerk-user-id']) {
    return null;
  }
  return sessionData;
};

export const useInterviewCoins = async (req, res) => {
  try {
    const sessionData = await getSessionUser(req);
    if (!sessionData) return res.status(401).json({ success: false, message: 'Application session expired.' });
    const { coins, action } = req.body;
    if (!Number.isFinite(Number(coins)) || Number(coins) <= 0) {
      return res.status(400).json({ success: false, message: 'Valid coins are required' });
    }
    const user = await User.findById(sessionData.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    if (user.interviewCoin < Number(coins)) {
      return res.status(403).json({ success: false, message: 'Not enough interview coins', interviewCoin: user.interviewCoin });
    }
    user.interviewCoin -= Number(coins);
    await user.save();
    await writeSession(req.cookies.session, user);
    return res.json({ success: true, message: 'Interview coins updated successfully', action, interviewCoin: user.interviewCoin });
  } catch (error) {
    return sendServerError(res, error);
  }
};

export const addCoins = async (req, res) => {
  try {
    const sessionData = await getSessionUser(req);
    if (!sessionData) return res.status(401).json({ success: false, message: 'Application session expired.' });
    const { coins } = req.body;
    if (!Number.isFinite(Number(coins)) || Number(coins) <= 0) {
      return res.status(400).json({ success: false, message: 'Valid coins are required' });
    }
    const user = await User.findById(sessionData.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    user.interviewCoin += Number(coins);
    await user.save();
    await writeSession(req.cookies.session, user);
    return res.json({ success: true, message: 'Coins added successfully', interviewCoin: user.interviewCoin });
  } catch (error) {
    return sendServerError(res, error);
  }
};
