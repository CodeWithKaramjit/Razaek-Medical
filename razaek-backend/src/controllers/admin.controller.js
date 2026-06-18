const prisma = require('../config/database');
const response = require('../utils/response');

const getStats = async (req, res) => {
  const [totalBookings, totalPatients, pendingBookings, completedBookings, activeCoordinators] = await Promise.all([
    prisma.booking.count(),
    prisma.user.count({ where: { role: 'PATIENT' } }),
    prisma.booking.count({ where: { status: 'PENDING' } }),
    prisma.booking.count({ where: { status: 'COMPLETED' } }),
    prisma.user.count({ where: { role: 'COORDINATOR', isActive: true } }),
  ]);

  // Aggregate sum of total amount if present
  const bookingsAmount = await prisma.booking.aggregate({
    _sum: {
      totalAmountUSD: true,
    },
  });

  return response.success(
    res,
    {
      totalBookings,
      totalPatients,
      pendingBookings,
      completedBookings,
      activeCoordinators,
      estimatedRevenueUSD: bookingsAmount._sum.totalAmountUSD || 0,
    },
    'Admin statistics fetched.'
  );
};

const getBookings = async (req, res) => {
  const { status, coordinatorId, page = 1, limit = 20 } = req.query;
  const where = {};

  if (status) where.status = status;
  if (coordinatorId) {
    where.coordinatorAssignment = { coordinatorId };
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      where,
      include: {
        patient: { select: { id: true, name: true, email: true, phone: true, country: true } },
        package: { select: { id: true, name: true, tier: true, priceUSD: true } },
        hospital: { select: { id: true, name: true, city: true } },
        coordinatorAssignment: {
          include: { coordinator: { select: { id: true, name: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: parseInt(limit),
    }),
    prisma.booking.count({ where }),
  ]);

  return response.paginated(res, bookings, total, page, limit, 'Admin bookings fetched.');
};

const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status, totalAmountUSD } = req.body;

  if (!status) {
    return response.error(res, 'Status is required.', 400);
  }

  const booking = await prisma.booking.update({
    where: { id },
    data: { status, totalAmountUSD },
    include: { patient: true, package: true },
  });

  // Create notification for patient about status change
  await prisma.notification.create({
    data: {
      userId: booking.patientId,
      bookingId: booking.id,
      title: 'Booking Status Updated',
      body: `Your medical travel package booking status has changed to: ${status}.`,
    },
  });

  return response.success(res, booking, 'Booking status updated successfully.');
};

const assignCoordinator = async (req, res) => {
  const { bookingId, coordinatorId } = req.body;

  if (!bookingId || !coordinatorId) {
    return response.error(res, 'bookingId and coordinatorId are required.', 400);
  }

  // Verify the coordinator exists and actually is a coordinator
  const coordinator = await prisma.user.findFirst({
    where: { id: coordinatorId, role: { in: ['COORDINATOR', 'ADMIN', 'SUPERADMIN'] } },
  });

  if (!coordinator) {
    return response.error(res, 'Invalid coordinator ID.', 400);
  }

  const assignment = await prisma.coordinatorAssignment.upsert({
    where: { bookingId },
    update: { coordinatorId },
    create: { bookingId, coordinatorId },
    include: {
      booking: { include: { patient: true } },
      coordinator: { select: { id: true, name: true } },
    },
  });

  // Notify the patient about the assigned coordinator
  await prisma.notification.create({
    data: {
      userId: assignment.booking.patientId,
      bookingId: assignment.bookingId,
      title: 'Care Coordinator Assigned',
      body: `${coordinator.name} has been assigned as your personal care coordinator.`,
    },
  });

  return response.success(res, assignment, 'Care coordinator assigned successfully.');
};

const getPatients = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [patients, total] = await Promise.all([
    prisma.user.findMany({
      where: { role: 'PATIENT' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        country: true,
        passportNo: true,
        isActive: true,
        createdAt: true,
        _count: { select: { bookings: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: parseInt(limit),
    }),
    prisma.user.count({ where: { role: 'PATIENT' } }),
  ]);

  return response.paginated(res, patients, total, page, limit, 'Patients fetched.');
};

const toggleUserStatus = async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  if (typeof isActive !== 'boolean') {
    return response.error(res, 'isActive status must be a boolean.', 400);
  }

  const user = await prisma.user.update({
    where: { id },
    data: { isActive },
    select: { id: true, name: true, email: true, isActive: true },
  });

  return response.success(res, user, `User account ${isActive ? 'activated' : 'deactivated'}.`);
};

module.exports = {
  getStats,
  getBookings,
  updateBookingStatus,
  assignCoordinator,
  getPatients,
  toggleUserStatus,
};
