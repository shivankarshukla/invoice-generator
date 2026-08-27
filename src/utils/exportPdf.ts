import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

// Render the clone at desktop width so the `md:` layout rules resolve the same
// way they do when printing from a browser, regardless of the real device size.
const CAPTURE_WIDTH_PX = 1024;

export function buildInvoiceFileName(billNumber: string, year: string): string {
  const parts = ['Invoice', billNumber, year].filter(Boolean);
  return `${parts.join('-').replace(/[^a-zA-Z0-9-_]/g, '_')}.pdf`;
}

async function renderToPdf(element: HTMLElement): Promise<jsPDF> {
  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: '#ffffff',
    useCORS: true,
    windowWidth: CAPTURE_WIDTH_PX,
    onclone: (_doc, clone) => {
      const overlay = clone.closest('.invoice-preview-container') as HTMLElement | null;
      if (overlay) {
        overlay.style.position = 'static';
        overlay.style.background = '#ffffff';
        overlay.style.overflow = 'visible';
      }

      clone.querySelectorAll<HTMLElement>('.no-print').forEach((node) => {
        node.style.display = 'none';
      });

      // `print:h-44` never applies to a screen capture, so restore the taller
      // letterhead gap the printed invoice reserves for the company stamp.
      const spacer = clone.querySelector<HTMLElement>('[data-letterhead-spacer]');
      if (spacer) {
        spacer.style.height = '11rem';
      }

      clone.style.width = `${CAPTURE_WIDTH_PX}px`;
      clone.style.padding = '2rem';
      clone.style.background = '#ffffff';
    },
  });

  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const imageData = canvas.toDataURL('image/png');
  const imageHeightMm = (canvas.height * A4_WIDTH_MM) / canvas.width;

  pdf.addImage(imageData, 'PNG', 0, 0, A4_WIDTH_MM, imageHeightMm);

  let remaining = imageHeightMm - A4_HEIGHT_MM;
  let offset = 0;
  while (remaining > 0) {
    offset -= A4_HEIGHT_MM;
    pdf.addPage();
    pdf.addImage(imageData, 'PNG', 0, offset, A4_WIDTH_MM, imageHeightMm);
    remaining -= A4_HEIGHT_MM;
  }

  return pdf;
}

export async function exportInvoicePdf(element: HTMLElement, fileName: string): Promise<void> {
  const pdf = await renderToPdf(element);

  if (!Capacitor.isNativePlatform()) {
    pdf.save(fileName);
    return;
  }

  const base64 = pdf.output('datauristring').split(',')[1];
  const { uri } = await Filesystem.writeFile({
    path: fileName,
    data: base64,
    directory: Directory.Cache,
  });

  await Share.share({
    title: fileName,
    dialogTitle: 'Share invoice',
    files: [uri],
  });
}
