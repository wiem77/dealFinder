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
        '-' +
        Math.floor(Math.random() * 1000) +
        '.' +
        extension
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    req.fileValidationError = 'Forbidden extension';
    cb(null, false, req.fileValidationError);
  }
};

module.exports = multer({ storage: storage, fileFilter: fileFilter });
