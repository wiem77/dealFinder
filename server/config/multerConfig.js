const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/image');
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split('.').pop();
    cb(
      null,
      new Date().toISOString().replace(/:/g, '-') +
        file.fieldname +
        '.' +
        extension
    );
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    req.fileValidationError = 'Forbidden extension';
    return cb(null, false, req.fileValidationError);
  }
};

module.exports = multer({ storage: storage, fileFilter: fileFilter });
