const QRCode = require('qrcode');

module.exports.generateQrCode = (stringdata, callback) => {
  console.log('test1');
  QRCode.toString(stringdata, { type: 'terminal' }, function (err, url) {
    if (err) {
      console.log('error occurred');
      return callback(err);
    }
    console.log('QR code string:', url);
    console.log('test2');
    QRCode.toDataURL(stringdata, function (err, url) {
      if (err) {
        console.log('error occurred');
        return callback(err);
      }

      console.log('test3');
      callback(null, url);
    });
  });
};

// module.exports.generateQrCode = (stringdata) => {
//   console.log('test1');
//   QRCode.toString(stringdata, { type: 'terminal' }, function (err, url) {
//     if (err) return console.log('error occurred');
//     console.log(url);
//     console.log('test2');
//     QRCode.toDataURL(stringdata, function (err, url) {
//       if (err) return console.log('error occurred');
//       // console.log(url);
//     });
//     console.log('test3');
//     QRCode.toDataURL(stringdata, function (err, url) {
//       if (err) return console.log('error occurred');
//       // console.log(url);
//     });
//   });
// };
