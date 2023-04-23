const express = require('express');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes/autrh');
const guestRoutes = require('./routes/guestRoutes/guest');
const categoryRoutes = require('./routes/categoryRoutes/categoryRoutes');
const subcategoryRoutes = require('./routes/subCategoryRoutes/subCategoryRoutes');
const storeRoutes = require('./routes/storeRoutes/storeRoute');

const locationRoutes = require('./routes/locationRoutes/location');
require('dotenv').config({ path: './config/.env' });
const dbConnect = require('./config/connectDb');

const app = express();
//ConnecetDB
dbConnect();
//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(
  cors({
    origin: 'exp://172.20.10.2:19000',
  })
);

app.use(cookieParser());
app.use('/api', authRoutes);

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
