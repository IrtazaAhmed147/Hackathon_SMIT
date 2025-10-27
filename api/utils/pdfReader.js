import PDFParser from "pdf2json";
import fetch from "node-fetch";

export const extractTextFromPdf = async (filePathOrUrl) => {
  return new Promise(async (resolve, reject) => {
    const pdfParser = new PDFParser();
    let dataBuffer;

    const safeDecode = (text) => {
      try {
        return decodeURIComponent(text);
      } catch {
        return text;
      }
    };

    try {
      if (filePathOrUrl.startsWith("http")) {
        const response = await fetch(filePathOrUrl);
        if (!response.ok) throw new Error("Failed to fetch PDF");
        dataBuffer = Buffer.from(await response.arrayBuffer());
      } else {
        const fs = await import("fs/promises");
        dataBuffer = await fs.readFile(filePathOrUrl);
      }

      pdfParser.on("pdfParser_dataError", (err) => reject(err.parserError));
      pdfParser.on("pdfParser_dataReady", (pdfData) => {
        const text = pdfData.Pages.map((page) =>
          page.Texts.map((t) =>
            safeDecode(t.R.map((r) => r.T).join(""))
          ).join(" ")
        ).join("\n");

        resolve(text.trim());
      });

      pdfParser.parseBuffer(dataBuffer);
    } catch (err) {
      console.error("PDF Parsing Error:", err);
      reject("Failed to extract text from PDF");
    }
  });
};
