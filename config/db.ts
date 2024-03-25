export {};
//Connection file to mongo db
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 120000,
      socketTimeoutMS: 120000,
      // useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error:any) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
