const prisma = require('../config/database');
const response = require('../utils/response');

const getAll = async (req, res) => {
  const specialties = await prisma.specialty.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
  });
  return response.success(res, specialties, 'Specialties fetched successfully.');
};

const getById = async (req, res) => {
  const specialty = await prisma.specialty.findUnique({
    where: { id: req.params.id },
    include: {
      packages: { where: { isActive: true }, orderBy: { priceUSD: 'asc' } },
      hospitalSpecialties: {
        include: { hospital: true },
      },
    },
  });

  if (!specialty) {
    return response.error(res, 'Specialty not found.', 404);
  }

  return response.success(res, specialty, 'Specialty details fetched.');
};

const create = async (req, res) => {
  const { name, icon, description, imageUrl } = req.body;

  if (!name) return response.error(res, 'Name is required.', 400);

  const specialty = await prisma.specialty.create({
    data: { name, icon, description, imageUrl },
  });

  return response.created(res, specialty, 'Specialty created.');
};

const update = async (req, res) => {
  const { name, icon, description, imageUrl, isActive } = req.body;

  const specialty = await prisma.specialty.update({
    where: { id: req.params.id },
    data: { name, icon, description, imageUrl, isActive },
  });

  return response.success(res, specialty, 'Specialty updated.');
};

const remove = async (req, res) => {
  await prisma.specialty.delete({ where: { id: req.params.id } });
  return response.success(res, null, 'Specialty deleted.');
};

module.exports = { getAll, getById, create, update, remove };
