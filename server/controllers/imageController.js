const Media = require('../models/MediaModel');
const storage = require('../config/multerConfig').storage;
const multer = require('multer');
const fs = require('fs');
const path = require('path');
module.exports.uploadImg = async (req, res) => {
  console.log(req.file.originalname);
  const imageUri = req.file.path;

  const imageType = req.file.mimetype;
  // console.log('imageUri', imageUri);
  // console.log('imageType', imageType);

  const fileName = req.file.originalname;
  const filePath = path.join(__dirname, '..', 'public', 'image', fileName);
  console.log('fileName', fileName);

  fs.writeFile(filePath, imageUri, 'base64', async function (err) {
    if (err) {
      console.log('Error saving image:', err);
      res.status(500).send('Error saving image');
    } else {
      // console.log('Image saved:', filePath);
      const media = new Media({
        path: `C:/Users/User/Desktop/All/DealFinder/server/controllers/image/${fileName}`,
        extension: fileName.split('.').pop(),
      });
      await media.save();
      console.log('Media saved:', media);
      res.status(200).send('Image and media saved');
    }
  });
};

module.exports.getImage = async (req, res) => {
  const media = await Media.findById(req.params.id);
  console.log(media);
  if (!media) {
    return res.status(404).send('Media not found');
  }
  const fileName = path.basename(media.path);
  const filePath = path.join(__dirname, '..', 'public', 'image', fileName);

  const data = fs.readFileSync(filePath);
  console.log('data', data);
  res.contentType(media.extension);
  res.send(data);
};
