const prisma = require('../config/database');
const response = require('../utils/response');

const getAll = async (req, res) => {
  const { specialtyId, city, page = 1, limit = 20 } = req.query;
  const where = { isActive: true };

  if (city) where.city = { contains: city, mode: 'insensitive' };

  // Filter by specialty via junction table
  if (specialtyId) {
    where.specialties = { some: { specialtyId } };
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [hospitals, total] = await Promise.all([
    prisma.hospital.findMany({
      where,
      include: {
        specialties: { include: { specialty: { select: { id: true, name: true } } } },
        _count: { select: { doctors: true } },
      },
      orderBy: { rating: 'desc' },
      skip,
      take: parseInt(limit),
    }),
    prisma.hospital.count({ where }),
  ]);

  return response.paginated(res, hospitals, total, page, limit, 'Hospitals fetched.');
};

const getById = async (req, res) => {
  const hospital = await prisma.hospital.findUnique({
    where: { id: req.params.id },
    include: {
      specialties: { include: { specialty: true } },
      doctors: {
        where: { isActive: true },
        include: { specialty: { select: { id: true, name: true } } },
      },
    },
  });

  if (!hospital) return response.error(res, 'Hospital not found.', 404);
  return response.success(res, hospital, 'Hospital details fetched.');
};

const create = async (req, res) => {
  const { name, city, state, address, rating, accreditations, imageUrls, description, phone, email, websiteUrl, specialtyIds } = req.body;

  if (!name || !city || !state) {
    return response.error(res, 'Name, city, and state are required.', 400);
  }

  const hospital = await prisma.hospital.create({
    data: {
      name,
      city,
      state,
      address,
      rating,
      accreditations: accreditations || [],
      imageUrls: imageUrls || [],
      description,
      phone,
      email,
      websiteUrl,
      specialties: specialtyIds?.length
        ? { createMany: { data: specialtyIds.map((sid) => ({ specialtyId: sid })) } }
        : undefined,
    },
    include: { specialties: { include: { specialty: true } } },
  });

  return response.created(res, hospital, 'Hospital created.');
};

const update = async (req, res) => {
  const { name, city, state, address, rating, accreditations, imageUrls, description, phone, email, websiteUrl, isActive, specialtyIds } = req.body;

  // If specialtyIds provided, replace junction entries
  if (specialtyIds) {
    await prisma.hospitalSpecialty.deleteMany({ where: { hospitalId: req.params.id } });
    if (specialtyIds.length > 0) {
      await prisma.hospitalSpecialty.createMany({
        data: specialtyIds.map((sid) => ({ hospitalId: req.params.id, specialtyId: sid })),
      });
    }
  }

  const hospital = await prisma.hospital.update({
    where: { id: req.params.id },
    data: { name, city, state, address, rating, accreditations, imageUrls, description, phone, email, websiteUrl, isActive },
    include: { specialties: { include: { specialty: true } } },
  });

  return response.success(res, hospital, 'Hospital updated.');
};

const remove = async (req, res) => {
  await prisma.hospital.delete({ where: { id: req.params.id } });
  return response.success(res, null, 'Hospital deleted.');
};

module.exports = { getAll, getById, create, update, remove };
