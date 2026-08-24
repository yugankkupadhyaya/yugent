import { getAuth } from '@clerk/express';

export const isAuth = (req, res, next) => {
  try {
    const { isAuthenticated, userId } = getAuth(req);

    if (!isAuthenticated || !userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    req.userId = userId;

    next();
  } catch (error) {
    console.error('Clerk auth error:', error);

    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }
};
