import express from 'express';
import cors from 'cors'; // Enable CORS for communication with the frontend
import multer from 'multer'; // Middleware for file uploads
import path from 'path'; // Node.js module for getting the file location
import { detectFileType } from './utils/fileTypeChecker.js';

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Define a map for MIME type to human-readable file type
const mimeTypeToFileType = {
  'application/pdf': 'pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    'docx',
  'application/msword': 'doc',
};

// Define storage for uploaded files (using multer)
// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // Save uploaded files in 'uploads'
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

// Multer configuration with file type filtering
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!mimeTypeToFileType[file.mimetype]) {
      return cb(new Error('Only PDF, DOCX, and DOC files are allowed.'));
    }
    cb(null, true);
  },
});

// Upload route
app.post('/upload', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;

  try {
    // Detect file type
    const fileType = await detectFileType(filePath);

    // Map MIME type to readable file type
    const readableFileType = mimeTypeToFileType[fileType];

    if (!readableFileType) {
      return res.status(400).json({
        error: 'Unsupported file type. Only PDF, DOCX, and DOC are allowed.',
      });
    }

    // Send a success response
    res.status(200).json({
      message: `${readableFileType.toUpperCase()} detected and uploaded successfully.`,
      fileType: readableFileType,
    });
  } catch (error) {
    console.error('Error processing file upload:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Error-handling middleware for Multer errors
app.use((err, req, res, next) => {
  if (
    err instanceof multer.MulterError ||
    err.message.includes('Only PDF, DOCX, and DOC files are allowed.')
  ) {
    // Handle file upload errors
    return res.status(400).json({ error: err.message });
  }
  // Handle other errors
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ error: 'Something went wrong. Please try again later.' });
});

// Test route
app.get('/', (req, res) => {
  res.send('PDF ↔ DOCX Converter Backend is Running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
