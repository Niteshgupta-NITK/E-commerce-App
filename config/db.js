const mongoose = require("mongoose");

const connectWithDB = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB is connected succefully"))
    .catch((error) => {
      console.log("DB connection Issue " + error);
      process.exit(1);
    });
};
module.exports = connectWithDB;
