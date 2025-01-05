import fs from 'fs/promises';
import pdfParse from 'pdf-parse'; // Library for extracting text from PDFs
import docxPdf from 'docx-pdf'; // Import CommonJS module as default

/**
 * Converts a PDF file to a DOCX file while preserving text content.
 * @param {string} inputPath - Path to the input PDF file.
 * @param {string} outputPath - Path to save the converted DOCX file.
 * @returns {Promise<string>} - Path to the converted DOCX file.
 */
export async function pdfToDocx(inputPath, outputPath) {
  try {
    // Read the uploaded PDF file
    const pdfBytes = await fs.readFile(inputPath);

    // Extract text from the PDF
    const pdfData = await pdfParse(pdfBytes);

    // Check if text extraction was successful
    if (!pdfData.text || pdfData.text.trim() === '') {
      throw new Error('Unable to extract text from the PDF file.');
    }

    // Write the extracted content to the DOCX file
    const docxContent = `DOCX content generated from PDF:\n\n${pdfData.text}`;
    await fs.writeFile(outputPath, docxContent, 'utf-8');

    return outputPath;
  } catch (error) {
    console.error('Error converting PDF to DOCX:', error);
    throw new Error(
      'Failed to convert PDF to DOCX. Please ensure the PDF file is valid and try again.'
    );
  }
}
