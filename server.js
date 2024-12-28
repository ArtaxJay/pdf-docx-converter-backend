// server.js

import express from 'express';
import cors from 'cors'; // Enable CORS for communication with the frontend
import uploadRoutes from './routes/upload.js'; // Import upload routes

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/upload', uploadRoutes); // Delegates upload logic to routes/upload.js

// Test route
app.get('/', (req, res) => {
  res.send('PDF ↔ DOCX Converter Backend is Running!');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ error: 'Something went wrong. Please try again later.' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
