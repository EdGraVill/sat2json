import QrScanner from 'qr-scanner';

export async function readQR(image: Parameters<typeof QrScanner['scanImage']>[0]) {
  return QrScanner.scanImage(image);
}
