// const upload = require("../Middlewear/Multer");
const mongoose = require("mongoose");
const courseSchema = mongoose.model("courses");
const upload = require("../Middlewear/Multer");

module.exports = app => {
  // Adding Course
  app.post("/course", upload.single("image"), async (req, res) => {
    console.log(req.file);
    if (!req.file) {
      return res.status(202).json({ msg: "Please upload a File" });
    }
    try {
      await new courseSchema({
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price,
        display: "true",
        img: req.file.path,
        date: new Date().toISOString()
      }).save();
      return res.send({ msg: "Added" });
    } catch (err) {
      console.log(err);
      return res.status(404).json({ err });
    }
  });
  // Getting all courses
  app.get("/courses", async (req, res) => {
    try {
      const response = await courseSchema.find({ display: "true" });
      return res.status(200).json({ response });
    } catch (err) {
      return res.status(404).jsone({ msg: err });
    }
  });
  // Delete Route
  app.delete("/course/delete/:id", async (req, res) => {
    try {
      const response = await courseSchema.findById(req.params.id);
      if (!response)
        return res.status(200).json({ msg: "Course already deleted" });
      await response.delete();
      return res.status(200).json({ msg: "Deleted Sucessfully" });
    } catch (err) {
      return res.status(400).json({ err });
    }
  });
  // Updateing!!!!
  app.put("/course/update/:id", async (req, res) => {
    try {
      const response = await courseSchema.findById(req.params.id);
      if (!response) return res.status(400).json({ msg: "Not Found" });
      const { name, desc, img } = req.body;
      const updated = new courseSchema({
        _id: response._id,
        name,
        desc,
        img,
        display: "true",
        date: new Date().toISOString()
      });
      await response.update(updated);
      return res.status(200).json({ msg: "Successfully Updated" });
    } catch (err) {
      return res.status(404).json({ err: err });
    }
  });
};
