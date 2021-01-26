const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(
    `mongodb://shapee:shapee@!23&${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}?auththSource=admin`,
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
