const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(
    `mongodb://shapee:${encodeURIComponent("shapee@!23")}@${
      process.env.DB_URL
    }:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  );

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
