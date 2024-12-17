````markdown
# **PDF ↔ DOCX Converter Backend**

This is the backend service for the PDF ↔ DOCX converter application. It provides RESTful APIs to handle file uploads, determine file types (PDF or DOCX), and convert between these formats.

---

## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [Features](#features)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Environment Variables](#environment-variables)
7. [API Endpoints](#api-endpoints)
8. [Running the Server](#running-the-server)
9. [Testing the APIs](#testing-the-apis)
10. [Project Structure](#project-structure)
11. [Contributing](#contributing)
12. [License](#license)

---

## **1. Project Overview**

This backend server is built using **Express.js** and handles the following tasks:

- Uploading PDF and DOCX files.
- Determining the uploaded file type.
- Converting files between PDF and DOCX formats.
- Responding to frontend requests for file conversion.

---

## **2. Technologies Used**

- **Node.js** with **Express.js** - Backend server framework.
- **Multer** - Middleware for handling file uploads.
- **CORS** - Middleware for enabling Cross-Origin Resource Sharing.
- **Child Processes** - For running external file conversion tools (e.g., LibreOffice).
- **Nodemon** - Development utility for automatic server restarts.

---

## **3. Features**

- File upload with drag-and-drop support.
- File validation: Only PDF and DOCX/DOC file types are allowed.
- Real-time upload progress.
- File type detection.
- Conversion of files between PDF and DOCX formats.
- RESTful API endpoints for seamless integration with the frontend.

---

## **4. Prerequisites**

Before running the project, make sure you have the following installed:

- **Node.js** (v14+ recommended): [Download Node.js](https://nodejs.org/)
- **npm** (Node Package Manager) - Comes with Node.js
- **LibreOffice** (Required for file conversion): [Download LibreOffice](https://www.libreoffice.org/)

---

## **5. Installation**

Follow these steps to set up the backend server:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/pdf-docx-converter-backend.git
   cd pdf-docx-converter-backend
   ```
````

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   - Create a `.env` file in the root directory.
   - Add the following variables (adjust values as needed):

     ```env
     PORT=5000
     UPLOAD_DIR=uploads
     LIBREOFFICE_PATH=/usr/bin/libreoffice  # Replace with your LibreOffice path
     ```

---

## **6. Environment Variables**

| Variable           | Description                | Default Value          |
| ------------------ | -------------------------- | ---------------------- |
| `PORT`             | Port for the server        | `5000`                 |
| `UPLOAD_DIR`       | Directory to store uploads | `uploads`              |
| `LIBREOFFICE_PATH` | Path to LibreOffice binary | `/usr/bin/libreoffice` |

---

## **7. API Endpoints**

Here are the available endpoints for the backend:

### 1. **Upload File**

- **Endpoint**: `POST /upload`
- **Description**: Accepts a file upload (PDF or DOCX).
- **Request Body**:
  - `file`: The uploaded file.
- **Response**:
  ```json
  {
    "message": "File uploaded successfully",
    "fileName": "sample.pdf",
    "fileType": "PDF"
  }
  ```

### 2. **Convert File**

- **Endpoint**: `POST /convert`
- **Description**: Converts the uploaded file to the opposite format.
- **Request Body**:
  - `file`: The uploaded file (PDF/DOCX).
- **Response**:
  ```json
  {
    "message": "File converted successfully",
    "convertedFile": "sample.docx"
  }
  ```

### 3. **Health Check**

- **Endpoint**: `GET /health`
- **Description**: Checks if the server is running.
- **Response**:
  ```json
  {
    "status": "OK",
    "uptime": "120s"
  }
  ```

---

## **8. Running the Server**

To start the server in development mode:

```bash
npm run dev
```

To run the server in production:

```bash
npm start
```

By default, the server will run on **http://localhost:5000**.

---

## **9. Testing the APIs**

You can test the backend APIs using tools like:

- **Postman** - Download [here](https://www.postman.com/).
- **cURL** - Command-line tool for testing HTTP endpoints.

### Example cURL Command for File Upload:

```bash
curl -X POST -F "file=@/path/to/your/file.pdf" http://localhost:5000/upload
```

---

## **10. Project Structure**

```plaintext
pdf-docx-converter-backend/
│
├── uploads/             # Directory for uploaded files
├── src/
│   ├── routes/          # API route handlers
│   │   └── fileRoutes.js
│   ├── controllers/     # Controller logic for routes
│   │   └── fileController.js
│   ├── services/        # File conversion logic
│   │   └── convertService.js
│   ├── middleware/      # Custom middleware (e.g., file validation)
│   │   └── uploadMiddleware.js
│   └── server.js        # Main server entry point
│
├── .gitignore           # Files/directories ignored by Git
├── package.json         # Project metadata and dependencies
├── .env                 # Environment variables
└── README.md            # Project documentation
```

---

## **11. Contributing**

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your feature description"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Submit a pull request.

---

## **12. License**

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for details.

---

## **Acknowledgments**

Special thanks to the open-source tools and libraries that made this project possible, including **Express.js**, **Multer**, and **LibreOffice**.
