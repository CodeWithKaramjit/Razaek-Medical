const logger = require('../utils/logger');
const response = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  logger.error(err);

  // Prisma unique constraint error code
  if (err.code === 'P2002') {
    return response.error(
      res,
      `Duplicate value error: A record with this ${err.meta?.target?.join(', ') || 'field'} already exists.`,
      409
    );
  }

  // Prisma record not found error code
  if (err.code === 'P2025') {
    return response.error(res, 'Record not found.', 404);
  }

  // Default Express/Server Error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return response.error(
    res,
    message,
    statusCode,
    process.env.NODE_ENV === 'development' ? { stack: err.stack } : null
  );
};

module.exports = errorHandler;
