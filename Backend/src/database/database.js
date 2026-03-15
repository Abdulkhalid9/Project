require('dotenv').config();
const mongoose = require('mongoose');

// create a function to connect to the database
function connectToDatabase() {
  mongoose.connect(process.env.DB_URI)
    .then(() => {
      console.log('Connected to the database successfully');
    })
    .catch((err) => {
      console.error('Database connection error:', err);
    });
}

module.exports = connectToDatabase;
