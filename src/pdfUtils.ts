import type { TypedArray } from 'pdfjs-dist/types/src/display/api';
import * as pdfjs from 'pdfjs-dist';
// @ts-ignore 
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker.default;

export async function pdfToImages(file: File) {
  const buffer = await file.arrayBuffer() as TypedArray;

  const pdfDocument = await pdfjs.getDocument(buffer).promise;

  const { numPages } = pdfDocument;

  const images = await Promise.all(Array.from({ length: numPages }).map(async (_, ix) => {
    const canvas = document.createElement('canvas');
    canvas.style.display = 'none';

    const page = await pdfDocument.getPage(ix + 1);
    const viewport = page.getViewport({ scale: 1 });

    const canvasContext = canvas.getContext('2d')!;

    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    canvas.style.width = `${Math.floor(viewport.width)}px`;
    canvas.style.height =  `${Math.floor(viewport.height)}px`;

    await page.render({ canvasContext, viewport }).promise;

    return canvas.toDataURL();
  }));

  return images;
}
