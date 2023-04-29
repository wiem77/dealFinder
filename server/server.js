const express = require('express');
const multer = require('multer');
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
require('dotenv').config({ path: './config/.env' });
const dbConnect = require('./config/connectDb');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dbConnect();

app.use(
  cors({
    origin: 'exp://192.168.8.101:19000',
  })
);

app.use(cookieParser());
app.use('/api', authRoutes);
app.use('/api', uploadRoutes);
app.use('/api', uploadRoutes);
app.use('/api/guest', guestRoutes);

app.use('/api/category', categoryRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/subCategory', subcategoryRoutes);
app.use('/api/location', locationRoutes);
//setPORT
const PORT = 4000;
app.listen(PORT, (err) =>
  err
    ? console.log(err)
    : console.log(`the server is running on http://localhost:${PORT}/api`)
);
