// utils/fileTypeChecker.js

import fileType from 'file-type';
import fs from 'fs/promises';

/**
 * Detect the MIME type of a file.
 * @param {string} filePath - Path to the file to check.
 * @returns {Promise<string>} - Returns the MIME type as a string.
 */
export async function detectFileType(filePath) {
  const fileBuffer = await fs.readFile(filePath);
  const type = await fileType.fromBuffer(fileBuffer);

  if (!type) {
    throw new Error('Unable to determine file type.');
  }
  return type.mime;
}
