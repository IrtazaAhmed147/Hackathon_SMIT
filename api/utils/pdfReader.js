// import { createRequire } from "module";
// import fs from "fs";

// const require = createRequire(import.meta.url);
// let pdfModule = require("pdf-parse");
// const pdf = typeof pdfModule === "function" ? pdfModule : pdfModule.default;
// const { PDFParse } = require('pdf-parse');
import {PDFParse} from 'pdf-parse'
/**
 * Reads a PDF file (from URL or local) and returns its text content.
 * Works with Cloudinary URLs or local file paths.
 * @param {string} filePathOrUrl - Path or Cloudinary URL of the uploaded PDF
 * @returns {Promise<string>} Extracted text
 */
export const extractTextFromPdf = async (filePathOrUrl) => {
  try {
    const parser = new PDFParse({ url: filePathOrUrl});

	const result = await parser.getText();
   return result.text?.trim() || "";
    
  } catch (error) {
    console.error("PDF Parsing Error:", error);
    throw new Error("Failed to extract text from PDF");
  }
};
