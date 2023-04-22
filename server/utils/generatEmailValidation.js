const nodemailer = require('nodemailer');
require('dotenv').config({ path: './config/.env' });
let transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  port: 465,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = async (email, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log('email send successfully ');
  } catch (error) {
    console.log('error ', error);
  }
  transporter.verify((error, success) => {
    if (error) {
      console.log();
    } else {
      console.log('ready');
      console.log('success');
    }
  });
};
