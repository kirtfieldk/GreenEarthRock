// This is the Blogpost database!!
const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema({
  title: { type: String, required: true },
  date: { type: String, require: true },
  desc: { type: String, required: true },
  img: { type: String, required: true },
  price: { type: String, required: true },
  display: { type: String, required: true },
  dateAdded: Date
});
mongoose.model("products", productSchema);
