const uploader = require('../../config/multerConfig');
const express = require('express');
const router = express.Router();
const { uploadImg } = require('../../controllers/imageController');
//root:http://localhost:4000/api/upload'
router.post('/upload', uploader.single('image'), uploadImg);
module.exports = router;
