const app = require("./app");
const mongoose = require("mongoose");

const { DB_HOST, PORT = 8081 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log(`Database connection successful at port ${PORT}`);
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });