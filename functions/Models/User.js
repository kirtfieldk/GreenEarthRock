// This is the Blogpost database!!
const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: Date
});
console.log("created User dataBase");
mongoose.model("user", userSchema);
