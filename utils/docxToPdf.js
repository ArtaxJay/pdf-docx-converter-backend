import path from 'path';
import fs from 'fs/promises';
import docxPdf from 'docx-pdf'; // Assuming we are using 'docx-pdf' npm package

/**
 * Converts a DOCX file to a PDF file.
 * @param {string} inputFilePath - The path to the DOCX file to be converted.
 * @param {string} outputFileName - The desired name for the converted PDF file.
 * @returns {Promise<string>} - The path to the converted PDF file.
 */
export const docxToPdf = async (inputFilePath, outputFileName) => {
  // Set up the output directory for converted files
  const outputDir = path.resolve('converted'); // Root-level `/converted` directory
  const outputFilePath = path.join(outputDir, `${outputFileName}.pdf`);

  try {
    // Ensure the output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Perform the conversion
    await new Promise((resolve, reject) => {
      docxPdf(inputFilePath, outputFilePath, err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });

    // Return the path to the successfully converted file
    return outputFilePath;
  } catch (error) {
    console.error('Error in converting DOCX to PDF:', error);
    throw new Error('Failed to convert DOCX to PDF.');
  }
};
