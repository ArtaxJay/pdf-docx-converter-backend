import { readFile } from 'fs/promises';
import { fileTypeFromBuffer } from 'file-type';

export async function detectFileType(filePath) {
  try {
    // Read the file into a buffer
    const fileBuffer = await readFile(filePath);
    const fileType = await fileTypeFromBuffer(fileBuffer);

    // Supported types
    const supportedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (fileType && supportedTypes.includes(fileType.mime)) {
      return fileType.mime; // Return the MIME type (e.g., 'application/pdf')
    }
    return null; // Unsupported file type
  } catch (error) {
    console.error('Error detecting file type:', error);
    return null;
  }
}

// exports detectFileType;
