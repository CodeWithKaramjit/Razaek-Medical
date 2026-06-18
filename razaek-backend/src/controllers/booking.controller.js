const prisma = require('../config/database');
const response = require('../utils/response');

const create = async (req, res) => {
  const { packageId, hospitalId, doctorId, travelDateFrom, travelDateTo, notes } = req.body;

  if (!packageId || !hospitalId || !doctorId) {
    return response.error(res, 'packageId, hospitalId, and doctorId are required.', 400);
  }

  const booking = await prisma.booking.create({
    data: {
      patientId: req.user.id,
      packageId,
      hospitalId,
      doctorId,
      travelDateFrom: travelDateFrom ? new Date(travelDateFrom) : null,
      travelDateTo: travelDateTo ? new Date(travelDateTo) : null,
      notes,
    },
    include: {
      package: { select: { id: true, name: true, tier: true, priceUSD: true } },
      hospital: { select: { id: true, name: true, city: true } },
      doctor: { select: { id: true, name: true } },
    },
  });

  // Create notification for patient
  await prisma.notification.create({
    data: {
      userId: req.user.id,
      bookingId: booking.id,
      title: 'Booking Received',
      body: `Your booking for ${booking.package.name} has been received. We will confirm it shortly.`,
    },
  });

  return response.created(res, booking, 'Booking created successfully.');
};

const getMyBookings = async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;
  const where = { patientId: req.user.id };
  if (status) where.status = status;

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      where,
      include: {
        package: { select: { id: true, name: true, tier: true, priceUSD: true } },
        hospital: { select: { id: true, name: true, city: true } },
        doctor: { select: { id: true, name: true } },
        coordinatorAssignment: {
          include: { coordinator: { select: { id: true, name: true, phone: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: parseInt(limit),
    }),
    prisma.booking.count({ where }),
  ]);

  return response.paginated(res, bookings, total, page, limit, 'Bookings fetched.');
};

const getById = async (req, res) => {
  const booking = await prisma.booking.findUnique({
    where: { id: req.params.id },
    include: {
      patient: { select: { id: true, name: true, email: true, phone: true, country: true } },
      package: { include: { features: true, specialty: { select: { id: true, name: true } } } },
      hospital: true,
      doctor: true,
      reports: true,
      coordinatorAssignment: {
        include: { coordinator: { select: { id: true, name: true, email: true, phone: true } } },
      },
    },
  });

  if (!booking) return response.error(res, 'Booking not found.', 404);

  // Patient can only see their own bookings, admins can see all
  if (req.user.role === 'PATIENT' && booking.patientId !== req.user.id) {
    return response.error(res, 'Access denied.', 403);
  }

  return response.success(res, booking, 'Booking details fetched.');
};

module.exports = { create, getMyBookings, getById };
