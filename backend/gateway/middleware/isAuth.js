import { getAuth } from '@clerk/express';
import redis from '../shared/redis/redis.js';

export const isAuth = async (req, res, next) => {
  try {
    // 1. Verify Clerk identity
    const { isAuthenticated, userId } = getAuth(req);

    if (!isAuthenticated || !userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    req.userId = userId;

    // 2. Get Yugent application session
    const sessionId = req.cookies?.session;

    if (!sessionId) {
      return res.status(401).json({
        success: false,
        message: 'Application session missing',
      });
    }

    const session = await redis.get(`session:${sessionId}`);

    if (!session) {
      return res.status(401).json({
        success: false,
        message: 'Application session expired',
      });
    }

    const sessionData = JSON.parse(session);

    // 3. Make sure this Redis session belongs
    // to the same Clerk user
    if (sessionData.clerkUserId !== userId) {
      return res.status(401).json({
        success: false,
        message: 'Session does not belong to this user',
      });
    }

    // 4. Make Yugent application user available
    req.user = sessionData;

    next();
  } catch (error) {
    console.error('Authentication error:', error);

    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }
};
