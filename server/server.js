const express = require('express');
const {
  deleteExpiredReservations,
  updateExpiredReservations,
} = require('./utils/deleteExpiredRservation');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes/autrh');
const guestRoutes = require('./routes/guestRoutes/guest');
const categoryRoutes = require('./routes/categoryRoutes/categoryRoutes');
const subcategoryRoutes = require('./routes/subCategoryRoutes/subCategoryRoutes');
const storeRoutes = require('./routes/storeRoutes/storeRoute');
const uploadRoutes = require('./routes/imageRoutes/image');
const locationRoutes = require('./routes/locationRoutes/location');
const voucherRoutes = require('./routes/voucherRoutes/voucherRoutes');
const reservationRoutes = require('./routes/reservationRoute/reservationRoute');
require('dotenv').config({ path: './config/.env' });
const dbConnect = require('./config/connectDb');
const Reservation = require('./models/ReservationModel');
const { generateQrCode } = require('./utils/generateQrCode');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dbConnect();

app.use(
  cors('exp://192.168.8.101:19000')
  // cors({
  //   origin: ['http://localhost:3000', 'exp://192.168.8.101:19000'],
  //   optionsSuccessStatus: 200,
  // })
);

// deleteExpiredReservations();
// updateExpiredReservations();
let data = {
  name: 'Employee Name',
  age: 27,
  department: 'Police',
  id: 'aisuoiqu3234738jdhf100223',
};

// Converting the data into String format
// let stringdata = JSON.stringify(data);
// generateQrCode(stringdata);
app.use(cookieParser());
app.use('/api', authRoutes);
app.use('/api', uploadRoutes);
app.use('/api', uploadRoutes);
app.use('/api/guest', guestRoutes);

app.use('/api/category', categoryRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/subCategory', subcategoryRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/vouchers', voucherRoutes);
app.use('/api/reservation', reservationRoutes);
//setPORT
const PORT = 4000;
app.listen(PORT, (err) =>
  err
    ? console.log(err)
    : console.log(`the server is running on http://localhost:${PORT}/api`)
);
