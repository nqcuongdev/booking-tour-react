
const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(
    `mongodb://${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  );

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;