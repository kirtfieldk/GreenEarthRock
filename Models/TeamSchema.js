// This is the Blogpost database!!
const mongoose = require("mongoose");
const { Schema } = mongoose;
const teamSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  img: String,
  date: Date
});
console.log("created team dataBase");
mongoose.model("team", teamSchema);
