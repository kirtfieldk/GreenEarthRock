const mongoose = require("mongoose");
const eventSchema = mongoose.model("event");

module.exports = app => {
  app.get("/api/events", async (req, res) => {
    try {
      const response = eventSchema.find({ display: "true" });

      return res.json({ response });
    } catch (err) {
      console.log(err);
      return res.status(404).json({ msg: err });
    }
  });
  app.post("/api/events", async (req, res) => {
    console.log(req.body);
    try {
      const { title, location, desc, date } = req.body;
      if (
        title.length === 0 ||
        location.length === 0 ||
        desc.length === 0 ||
        date.length === 0
      )
        return res.status(400).json({ msg: "Cannot have empty properties" });

      const newEvent = new eventSchema({
        title,
        location,
        desc,
        date,
        dateAdded: new Date().toISOString(),
        display: "true"
      });

      await newEvent.save();
      return res.status(200).json({ newEvent });
    } catch (err) {
      console.log(err);
      return res.status(404).json({ msg: err });
    }
  });
};
