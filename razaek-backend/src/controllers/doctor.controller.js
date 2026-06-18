const prisma = require('../config/database');
const response = require('../utils/response');

const getAll = async (req, res) => {
  const { hospitalId, specialtyId, page = 1, limit = 20 } = req.query;
  const where = { isActive: true };

  if (hospitalId) where.hospitalId = hospitalId;
  if (specialtyId) where.specialtyId = specialtyId;

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [doctors, total] = await Promise.all([
    prisma.doctor.findMany({
      where,
      include: {
        hospital: { select: { id: true, name: true, city: true } },
        specialty: { select: { id: true, name: true } },
      },
      orderBy: { experience: 'desc' },
      skip,
      take: parseInt(limit),
    }),
    prisma.doctor.count({ where }),
  ]);

  return response.paginated(res, doctors, total, page, limit, 'Doctors fetched.');
};

const getById = async (req, res) => {
  const doctor = await prisma.doctor.findUnique({
    where: { id: req.params.id },
    include: {
      hospital: { select: { id: true, name: true, city: true, state: true, rating: true } },
      specialty: { select: { id: true, name: true } },
    },
  });

  if (!doctor) return response.error(res, 'Doctor not found.', 404);
  return response.success(res, doctor, 'Doctor details fetched.');
};

const create = async (req, res) => {
  const { name, hospitalId, specialtyId, experience, qualifications, bio, imageUrl } = req.body;

  if (!name || !hospitalId || !specialtyId) {
    return response.error(res, 'Name, hospitalId, and specialtyId are required.', 400);
  }

  const doctor = await prisma.doctor.create({
    data: {
      name,
      hospitalId,
      specialtyId,
      experience,
      qualifications: qualifications || [],
      bio,
      imageUrl,
    },
    include: {
      hospital: { select: { id: true, name: true } },
      specialty: { select: { id: true, name: true } },
    },
  });

  return response.created(res, doctor, 'Doctor created.');
};

const update = async (req, res) => {
  const { name, hospitalId, specialtyId, experience, qualifications, bio, imageUrl, isActive } = req.body;

  const doctor = await prisma.doctor.update({
    where: { id: req.params.id },
    data: { name, hospitalId, specialtyId, experience, qualifications, bio, imageUrl, isActive },
    include: {
      hospital: { select: { id: true, name: true } },
      specialty: { select: { id: true, name: true } },
    },
  });

  return response.success(res, doctor, 'Doctor updated.');
};

const remove = async (req, res) => {
  await prisma.doctor.delete({ where: { id: req.params.id } });
  return response.success(res, null, 'Doctor deleted.');
};

module.exports = { getAll, getById, create, update, remove };
