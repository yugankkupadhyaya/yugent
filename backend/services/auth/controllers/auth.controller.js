import User from '../model/user.model.js';

const DEFAULT_INTERVIEW_COINS = 150;

const ACTION_COIN_COSTS = {
  'resume-analysis': 25,
  'resume-builder-download': 10,
  'download-pdf': 10,
};

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
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
    return res.json({ success: true, user });
  } catch (error) {
    return handleAuthError(res, error);
  }
};

export const me = async (req, res) => {
  try {
    const user = await getOrCreateUser(req);
    return res.json({ success: true, user });
  } catch (error) {
    return handleAuthError(res, error);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('session', cookieOptions);
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
    return res.json({ success: true, message: 'Coins added successfully', interviewCoin: user.interviewCoin });
  } catch (error) {
    return handleAuthError(res, error);
  }
};
