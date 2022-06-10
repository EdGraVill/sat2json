import fetchTaxpayerData from './fetchTaxpayerData';
import { pdfToImages } from './pdfUtils';
import { readQR } from './qrUtils';

export type Taxpayer = Array<{
  sectionName: string;
  fields: Array<{
    fieldName: string;
    value: string;
  }>;
}>

export default async function processFile(file: File): Promise<Taxpayer> {
  let satUrl = '';

  if (file.type === 'application/pdf') {
    const images = await pdfToImages(file);

    await Promise.all(images.map(async (image) => {
      try {
        const qrInformation = await readQR(image);
  
        if (qrInformation?.includes('https://siat.sat.gob.mx/app/qr/faces/pages/mobile/validadorqr.jsf?')) {
          satUrl = qrInformation;
        }
      } catch (error) {}
    }));
  } else if (file.type.includes('image/')) {
    try {
      const qrInformation = await readQR(file);

      if (qrInformation?.includes('https://siat.sat.gob.mx/app/qr/faces/pages/mobile/validadorqr.jsf?')) {
        satUrl = qrInformation;
      }
    } catch (error) {}
  }

  if (!satUrl) {
    throw new Error('Unable to read file to get taxpayer information');
  }

  const taxpayerData = await fetchTaxpayerData(satUrl);

  const dataContainer = Array.from(taxpayerData.getElementsByTagName('ul')).slice(1);

  const data: Taxpayer = dataContainer.map((ul) => ({
    sectionName: ul?.firstChild?.textContent || '',
    fields: Array.from(((ul?.lastChild as HTMLLIElement)?.querySelector('table[role=grid]:not([id])')?.lastChild as HTMLTableElement)?.children).map((tr) => ({
      fieldName: tr?.firstChild?.textContent?.replace(':', '') || '',
      value: tr?.lastChild?.textContent || '',
    })),
  }));

  return data;
}
