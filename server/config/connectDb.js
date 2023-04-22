const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' });
const DB = process.env.MONGODB_URI;
console.log(process.env.MONGODB_URI);

const dbConnect = () => {
  const connectionParams = { useNewUrlParser: true, useUnifiedTopology: true };
  mongoose.set('strictQuery', false).connect(DB, connectionParams);
  mongoose.connection.on('connected', () => {
    console.log('Connected to Database successfully');
  });
  mongoose.connection.on('error', (err) => {
    console.log('Error while Connecting to Database: ' + err);
  });
  mongoose.connection.on('disconnected', () => {
    console.log('Database disconnected');
  });
};

module.exports = dbConnect;
