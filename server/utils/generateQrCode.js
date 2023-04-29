const QRCode = require('qrcode');
const fs = require('fs');
const qrcodes = require('../public/qrcodes');

function generateQrCode(qrCodeData) {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(
      qrCodeData,
      {
        errorCorrectionLevel: 'H',
      },
      (err, qrCodeImageData) => {
        if (err) {
          reject(err);
        } else {
          const qrCodeImageFile = `../public/qrcodes/\${Date.now()}.png`;
          const qrCodeImageStream = fs.createWriteStream(qrCodeImageFile);
          qrCodeImageStream.on('finish', () => {
            resolve(qrCodeImageFile);
          });
          qrCodeImageStream.on('error', (err) => {
            reject(err);
          });
          qrCodeImageStream.write(
            Buffer.from(qrCodeImageData.split(',')[1], 'base64')
          );
          qrCodeImageStream.end();
        }
      }
    );
  });
}

module.exports = generateQrCode;
