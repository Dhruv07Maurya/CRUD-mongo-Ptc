const mongoose = require("mongoose");
const userSchemaa = new mongoose.Schema({
  name: String,
  email: String,
  imagee: String,
});
module.exports = mongoose.model("userr", userSchemaa);
