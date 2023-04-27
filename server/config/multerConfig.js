const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/image');
//   },
//   filename: function (req, file, cb) {
//     const extension = file.originalname.split('.').pop();
//     cb(
//       null,
//       new Date().toISOString().replace(/:/g, '-') +
//         '-' +
//         Math.floor(Math.random() * 1000) +
//         '.' +
//         extension
//     );
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
//   if (allowedMimeTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     req.fileValidationError = 'Forbidden extension';
//     cb(null, false, req.fileValidationError);
//   }
// };
const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid=FILE_TYPE_MAP[file.mimetype]
    let uploadError = new Error('invalid image type');
    if(isValid){
      uploadError = null;
    }
    cb(uploadError, './public/image');
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('-');
    const extension =FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

module.exports = multer({ storage: storage});
