const mongoose = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/Celebal_Task6';

// mongoose.set('debug', true);

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;