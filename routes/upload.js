import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { docxToPdf } from '../utils/docxToPdf.js';

const router = express.Router();

// Define allowed MIME types
const allowedMimeTypes = [
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
];

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // Uploads folder
  filename: (req, file, cb) => cb(null, file.originalname),
});

// Multer configuration
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error('Only DOCX files are allowed.'));
    }
    cb(null, true);
  },
});

// Handle file upload and conversion
router.post('/', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;
  const outputDir = path.join('uploads', 'converted');
  const outputFileName =
    path.basename(filePath, path.extname(filePath)) + '.pdf';
  const outputFilePath = path.join(outputDir, outputFileName);

  try {
    // Ensure the output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Perform the DOCX-to-PDF conversion
    await docxToPdf(filePath, outputFilePath);

    // Respond with the path to the converted file
    res.status(200).json({
      message: 'DOCX converted to PDF successfully.',
      convertedFile: outputFilePath,
    });
  } catch (error) {
    console.error('Error during file conversion:', error);
    res.status(500).json({ error: 'Failed to convert DOCX to PDF.' });
  }
});

// Export the router
export default router;
