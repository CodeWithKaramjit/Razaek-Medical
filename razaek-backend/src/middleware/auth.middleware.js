const { verifyAccessToken } = require('../utils/jwt');
const prisma = require('../config/database');
const response = require('../utils/response');
const logger = require('../utils/logger');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return response.error(res, 'Access denied. No token provided.', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);

    // Verify user still exists and is active
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true, role: true, isActive: true },
    });

    if (!user) {
      return response.error(res, 'User not found.', 401);
    }

    if (!user.isActive) {
      return response.error(res, 'Your account is deactivated.', 403);
    }

    req.user = user;
    next();
  } catch (err) {
    logger.error(`Auth Error: ${err.message}`);
    return response.error(res, 'Invalid or expired token.', 401);
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return response.error(res, 'Unauthorized.', 401);
    }

    if (!roles.includes(req.user.role)) {
      return response.error(res, 'Forbidden. You do not have permission to access this resource.', 403);
    }

    next();
  };
};

module.exports = { authenticate, authorize };
