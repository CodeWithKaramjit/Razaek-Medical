const bcrypt = require('bcryptjs');
const prisma = require('../config/database');
const { generateTokenPair, verifyRefreshToken, generateAccessToken } = require('../utils/jwt');
const response = require('../utils/response');

const register = async (req, res) => {
  const { name, email, password, phone, country, passportNo } = req.body;

  if (!name || !email || !password) {
    return response.error(res, 'Name, email, and password are required.', 400);
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return response.error(res, 'A user with this email already exists.', 400);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  // Check if this is the very first user; if so, make them an ADMIN/SUPERADMIN
  const totalUsers = await prisma.user.count();
  const role = totalUsers === 0 ? 'SUPERADMIN' : 'PATIENT';

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      phone,
      country,
      passportNo,
      role,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      country: true,
      passportNo: true,
      role: true,
    },
  });

  const tokens = generateTokenPair({ userId: user.id, role: user.role });

  return response.created(res, { user, ...tokens }, 'Registration successful.');
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return response.error(res, 'Email and password are required.', 400);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.isActive) {
    return response.error(res, 'Invalid credentials or account deactivated.', 400);
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return response.error(res, 'Invalid credentials.', 400);
  }

  const tokens = generateTokenPair({ userId: user.id, role: user.role });

  const userProfile = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    country: user.country,
    passportNo: user.passportNo,
    role: user.role,
  };

  return response.success(res, { user: userProfile, ...tokens }, 'Login successful.');
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return response.error(res, 'Refresh token is required.', 400);
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, role: true, isActive: true },
    });

    if (!user || !user.isActive) {
      return response.error(res, 'Invalid session or account deactivated.', 401);
    }

    const accessToken = generateAccessToken({ userId: user.id, role: user.role });
    return response.success(res, { accessToken }, 'Access token refreshed.');
  } catch (err) {
    return response.error(res, 'Invalid or expired refresh token.', 401);
  }
};

const getMe = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      country: true,
      passportNo: true,
      role: true,
      createdAt: true,
    },
  });

  return response.success(res, user, 'User profile fetched successfully.');
};

const updateMe = async (req, res) => {
  const { name, phone, country, passportNo } = req.body;

  const updatedUser = await prisma.user.update({
    where: { id: req.user.id },
    data: {
      name,
      phone,
      country,
      passportNo,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      country: true,
      passportNo: true,
      role: true,
    },
  });

  return response.success(res, updatedUser, 'Profile updated successfully.');
};

module.exports = {
  register,
  login,
  refreshToken,
  getMe,
  updateMe,
};
