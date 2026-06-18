const prisma = require('../config/database');
const response = require('../utils/response');

const getMyNotifications = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [notifications, total] = await Promise.all([
    prisma.notification.findMany({
      where: { userId: req.user.id },
      include: { booking: { select: { id: true, status: true } } },
      orderBy: { createdAt: 'desc' },
      skip,
      take: parseInt(limit),
    }),
    prisma.notification.count({ where: { userId: req.user.id } }),
  ]);

  return response.paginated(res, notifications, total, page, limit, 'Notifications fetched.');
};

const markAsRead = async (req, res) => {
  await prisma.notification.updateMany({
    where: { userId: req.user.id, isRead: false },
    data: { isRead: true },
  });

  return response.success(res, null, 'All notifications marked as read.');
};

module.exports = { getMyNotifications, markAsRead };
