const Media = require('../models/MediaModel');
const storage = require('../config/multerConfig').storage;
const multer = require('multer');
module.exports.uploadImg = async (req, res) => {
  const imageUri = req.body.image.uri;
  const imageType = req.body.image.type;
  console.log('imageUri', imageUri);
  console.log('imageType', imageType);
  const basePath = `${req.protocol}://${req.get('host')}/public/image/`;
  console.log(basePath);
  const fileName = imageUri;
  console.log('fileName', fileName);

  if (fileName) {
    const media = new Media({
      path: `${basePath}/${fileName}`,
      extension: fileName.split('.').pop(),
    });
    console.log('file1');
    await media.save();
    console.log('file2');
    picturePath = media._id;
  } else {
    console.log('file2');
    picturePath = [{ _id: '64451df21d60f6c16d318204' }];
  }
  console.log('finish');
};
