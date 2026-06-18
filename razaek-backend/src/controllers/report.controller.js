const prisma = require('../config/database');
const { getSupabaseClient } = require('../config/supabase');
const response = require('../utils/response');
const path = require('path');

const upload = async (req, res) => {
  const { bookingId } = req.body;

  if (!req.file) {
    return response.error(res, 'No file uploaded.', 400);
  }

  if (!bookingId) {
    return response.error(res, 'bookingId is required.', 400);
  }

  // Verify the booking belongs to this patient
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking || booking.patientId !== req.user.id) {
    return response.error(res, 'Booking not found or access denied.', 404);
  }

  const supabase = getSupabaseClient();
  const bucket = process.env.SUPABASE_BUCKET || 'medical-reports';
  const ext = path.extname(req.file.originalname);
  const fileName = `${req.user.id}/${bookingId}/${Date.now()}${ext}`;

  // Upload to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(fileName, req.file.buffer, {
      contentType: req.file.mimetype,
      upsert: false,
    });

  if (uploadError) {
    return response.error(res, `Upload failed: ${uploadError.message}`, 500);
  }

  // Get public URL
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);

  // Save record in DB
  const report = await prisma.medicalReport.create({
    data: {
      patientId: req.user.id,
      bookingId,
      fileName: req.file.originalname,
      fileUrl: urlData.publicUrl,
      fileType: req.file.mimetype,
    },
  });

  return response.created(res, report, 'Report uploaded successfully.');
};

const getByBooking = async (req, res) => {
  const { bookingId } = req.params;

  // Verify ownership
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking) return response.error(res, 'Booking not found.', 404);

  if (req.user.role === 'PATIENT' && booking.patientId !== req.user.id) {
    return response.error(res, 'Access denied.', 403);
  }

  const reports = await prisma.medicalReport.findMany({
    where: { bookingId },
    orderBy: { uploadedAt: 'desc' },
  });

  return response.success(res, reports, 'Reports fetched.');
};

module.exports = { upload, getByBooking };
