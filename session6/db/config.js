const mongoose = require("mongoose");
const MONGODB_URI = "mongodb://127.0.0.1:27017/test"; //connection string

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error in connecting to DB", error);
  }
};

module.exports = connectDB;
