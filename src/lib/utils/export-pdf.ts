import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportNodeToPdf(element: HTMLElement, filename = 'offer-pilot-report.pdf') {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#0b1020',
  });

  const imageData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
    unit: 'px',
    format: [canvas.width, canvas.height],
  });

  pdf.addImage(imageData, 'PNG', 0, 0, canvas.width, canvas.height);
  pdf.save(filename);
}
