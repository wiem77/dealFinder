const express = require('express');
const {
  verifyEmailWithOTP,
  resendVerificationEmail,
} = require('../../controllers/emailController/emailController');
const { auth } = require('../../middleWare/auth');
const { roleCheck } = require('../../middleWare/roleCheck');
const {
  signUp,
  signIn,
  getUserIdByEmail,

  getUsers,
  updateUserPassword,
  updateUser,
} = require('../../controllers/authUsers/auth');
const router = express.Router();
const uploader = require('../../config/multerConfig');

//root:http://localhost:4000/api/users/:userId/password
router.put('/users/:userId/password', updateUserPassword);
//root:http://localhost:4000/users/:userId/update
router.put('/users/:userId/update', updateUser);
//root:http://localhost:4000/api/getUsers
router.get('/getUsers', getUsers);
//root:http://localhost:4000/api/signUp
router.post('/signUp', uploader.single('image'), signUp);
//root:http://localhost:4000/api/signIn
router.post('/SignIn', signIn);
//http://localhost:4000/api/idUser/:email
router.get('/idUser/:email', getUserIdByEmail);

//http://localhost:4000/api/verifyEmail/:id
router.post('/verifyEmail/:id', verifyEmailWithOTP);
//http://localhost:4000/api/resendEmail
router.post('/resendEmail', resendVerificationEmail);
module.exports = router;
