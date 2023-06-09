const express = require('express');
const {
  updateExpiredReservations,
} = require('./utils/deleteExpiredRservation');

const authRoutes = require('./routes/authRoutes/autrh');
const guestRoutes = require('./routes/guestRoutes/guest');
const categoryRoutes = require('./routes/categoryRoutes/categoryRoutes');
const subcategoryRoutes = require('./routes/subCategoryRoutes/subCategoryRoutes');
const storeRoutes = require('./routes/storeRoutes/storeRoute');
const uploadRoutes = require('./routes/imageRoutes/image');
const locationRoutes = require('./routes/locationRoutes/location');
const voucherRoutes = require('./routes/voucherRoutes/voucherRoutes');
const reservationRoutes = require('./routes/reservationRoute/reservationRoute');
const userRoutes = require('./routes/userRoutes/userRoutes');
const adminRoutes = require('./routes/adminRoutes/AdminRoutes');

const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

require('dotenv').config({ path: './config/.env' });

const dbConnect = require('./config/connectDb');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dbConnect();

app.use(cors(['exp://192.168.1.137:19000', 'http://localhost:3000']));

// updateExpiredReservations();

app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api', authRoutes);
app.use('/api', uploadRoutes);
app.use('/api', uploadRoutes);
app.use('/api/guest', guestRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.use('/api/category', categoryRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/subCategory', subcategoryRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/vouchers', voucherRoutes);
app.use('/api/reservation', reservationRoutes);

const PORT = 4000;
app.listen(PORT, (err) =>
  err
    ? console.log(err)
    : console.log(`the server is running on http://localhost:${PORT}/api`)
);
