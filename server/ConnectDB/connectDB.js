const mongoose = require("mongoose");
require("dotenv").config();

const CONNECT_URL = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.z54mgsj.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(CONNECT_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connectDB success");
  } catch (error) {
    console.log("MongoDB connectDB error");
    process.exit(1);
  }
};

module.exports = connectDB;
