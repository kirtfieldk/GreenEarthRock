// This is the Blogpost database!!
const mongoose = require("mongoose");
const { Schema } = mongoose;
const courseSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  img: { type: String, required: false },
  price: { type: String, required: true },
  date: Date
});
mongoose.model("courses", courseSchema);
