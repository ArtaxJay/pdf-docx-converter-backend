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

// Define storage for uploaded files (using multer)
// const upload = multer({ dest: 'uploads/' }); // Files will be stored in an "uploads" folder
// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // Save uploaded files in 'uploads'
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Upload route
app.post('/upload', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;

  try {
    // Detect file type
    const fileType = await detectFileType(filePath);

    if (!fileType) {
      return res.status(400).json({
        error: 'Unsupported file type. Only PDF and DOCX are allowed.',
      });
    }

    // Send a success response
    res.status(200).json({ message: 'File uploaded successfully.', fileType });
  } catch (error) {
    console.error('Error processing file upload:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Test route
app.get('/', (req, res) => {
  res.send('PDF ↔ DOCX Converter Backend is Running!');
});

// Route for file uploads
// app.post('/upload', upload.single('file'), (req, res) => {
//   const file = req.file;

//   if (!file) {
//     return res.status(400).json({ error: 'No file uploaded' });
//   }

//   // File information (name, type, path)
//   res.json({
//     message: 'File uploaded successfully',
//     filename: file.originalname,
//     path: file.path,
//   });
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
