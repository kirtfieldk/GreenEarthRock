// This is the Blogpost database!!
const mongoose = require("mongoose");
const { Schema } = mongoose;
const eventSchema = new Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, require: true },
  desc: { type: String, required: true },
  display: { type: String, required: true },
  dateAdded: Date
});
console.log("created User dataBase");
mongoose.model("event", eventSchema);
