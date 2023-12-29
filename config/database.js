const mongoose = require("mongoose");
require("dotenv").config();

const mongodb = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongodb;
