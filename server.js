const express = require('express');
const cors = require('cors'); // Enable CORS for communication with the frontend
const multer = require('multer'); // Middleware for file uploads

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Define storage for uploaded files (using multer)
const upload = multer({ dest: 'uploads/' }); // Files will be stored in an "uploads" folder

// Test route
app.get('/', (req, res) => {
  res.send('PDF ↔ DOCX Converter Backend is Running!');
});

// Route for file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // File information (name, type, path)
  res.json({
    message: 'File uploaded successfully',
    filename: file.originalname,
    path: file.path,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
