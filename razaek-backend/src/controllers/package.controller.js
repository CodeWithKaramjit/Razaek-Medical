const prisma = require('../config/database');
const response = require('../utils/response');

const getAll = async (req, res) => {
  const { specialtyId, tier } = req.query;
  const where = { isActive: true };

  if (specialtyId) where.specialtyId = specialtyId;
  if (tier) where.tier = tier;

  const packages = await prisma.package.findMany({
    where,
    include: {
      specialty: { select: { id: true, name: true, icon: true } },
      features: true,
    },
    orderBy: { priceUSD: 'asc' },
  });

  return response.success(res, packages, 'Packages fetched successfully.');
};

const getById = async (req, res) => {
  const pkg = await prisma.package.findUnique({
    where: { id: req.params.id },
    include: {
      specialty: { select: { id: true, name: true, icon: true } },
      features: { orderBy: { id: 'asc' } },
    },
  });

  if (!pkg) return response.error(res, 'Package not found.', 404);
  return response.success(res, pkg, 'Package details fetched.');
};

const create = async (req, res) => {
  const { name, tier, specialtyId, priceUSD, priceINR, duration, description, features } = req.body;

  if (!name || !tier || !specialtyId || !priceUSD || !priceINR) {
    return response.error(res, 'Name, tier, specialtyId, priceUSD, and priceINR are required.', 400);
  }

  const pkg = await prisma.package.create({
    data: {
      name,
      tier,
      specialtyId,
      priceUSD,
      priceINR,
      duration,
      description,
      features: features?.length
        ? { createMany: { data: features.map((f) => ({ feature: f.feature, included: f.included ?? true })) } }
        : undefined,
    },
    include: { features: true },
  });

  return response.created(res, pkg, 'Package created.');
};

const update = async (req, res) => {
  const { name, tier, priceUSD, priceINR, duration, description, isActive, features } = req.body;

  // If features are provided, delete old ones and insert new
  if (features?.length) {
    await prisma.packageFeature.deleteMany({ where: { packageId: req.params.id } });
    await prisma.packageFeature.createMany({
      data: features.map((f) => ({ packageId: req.params.id, feature: f.feature, included: f.included ?? true })),
    });
  }

  const pkg = await prisma.package.update({
    where: { id: req.params.id },
    data: { name, tier, priceUSD, priceINR, duration, description, isActive },
    include: { features: true },
  });

  return response.success(res, pkg, 'Package updated.');
};

const remove = async (req, res) => {
  await prisma.package.delete({ where: { id: req.params.id } });
  return response.success(res, null, 'Package deleted.');
};

module.exports = { getAll, getById, create, update, remove };
