import PDFDocument from 'pdfkit';
import { generatePDF } from '../utils/pdfGenerator';

export function generatePDF(income, expense) {
  const doc = new PDFDocument();
  doc.text(`Financial Report`, { align: 'center' });
  doc.text(`Total Income: $${income}`);
  doc.text(`Total Expense: $${expense}`);
  return doc;
}

const downloadPDF = () => {
    const doc = generatePDF(5000, 3000);
    doc.pipe(window.open('', '_blank'));
    doc.end();
  };
