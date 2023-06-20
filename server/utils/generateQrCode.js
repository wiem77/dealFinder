const QRCode = require('qrcode');

module.exports.generateQrCode = (stringdata, callback) => {
  QRCode.toString(stringdata, { type: 'terminal' }, function (err, url) {
    if (err) {
      console.log('error occurred');
      return callback(err);
    }
    console.log('QR code string:', url);

    QRCode.toDataURL(stringdata, function (err, url) {
      if (err) {
        console.log('error occurred');
        return callback(err);
      }

      callback(null, url);
    });
  });
};
