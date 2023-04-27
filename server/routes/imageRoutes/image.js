const uploader = require('../../config/multerConfig');
const express = require('express');
const router = express.Router();
const { uploadImg,getImage } = require('../../controllers/imageController');
//root:http://localhost:4000/api/upload'
router.post('/upload', uploader.single('image'), uploadImg);
router.get('/image/:id',getImage)
module.exports = router;
