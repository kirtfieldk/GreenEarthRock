const mongoose = require("mongoose");
const productSchema = mongoose.model("products");

module.exports = app => {
  // Get all Products
  app.get("/products", async (req, res) => {
    try {
      const response = await productSchema.find({ display: "true" });
      return res.status(200).json({ response });
    } catch (err) {
      console.log(err);
      return res.status(404).json({ msg: err });
    }
  });
  // Get SIngle Product
  app.get("/products/:id", async (req, res) => {
    try {
      const response = await productSchema.findById(req.params.id);
      return res.status(200).json({ response });
    } catch (err) {
      console.log(err);
      return res.status(404).json({ err });
    }
  });
  // Get Top Product
  app.get("/top-products", async (req, res) => {
    try {
      const response = await productSchema.find({ tp: true });
      return res.status(200).json({ response });
    } catch (err) {
      console.log(err);
      return res.status(404).json({ err });
    }
  });
  // Adding a Product
  app.post("/products", async (req, res) => {
    try {
      const { title, desc, img, price } = req.body;
      if (title.length === 0 || desc.length === 0 || img.length === 0)
        return res.status(400).json({ msg: "Cannot have empty properties" });

      const newProduct = new productSchema({
        title,
        img,
        desc,
        price,
        dateAdded: new Date().toISOString(),
        display: "true"
      });

      await newProduct.save();
      return res.status(200).json({ newProduct });
    } catch (err) {
      console.log(err);
      return res.status(404).json({ msg: err });
    }
  });
  // Editing a product
  app.put("/products/edit/:id", async (req, res) => {
    try {
      const { title, desc, img } = req.body;
      if (title.length === 0 || desc.length === 0 || img.length === 0)
        return res.status(400).json({ msg: "Cannot have empty properties" });
      const findObj = await productSchema.findById(req.params.id);
      const newProduct = new productSchema({
        title,
        img,
        desc,
        _id: req.params.id,
        dateAdded: new Date().toISOString(),
        display: "true"
      });
      await findObj.update(newProduct);
      return res.status(200).json({ newProduct });
    } catch (err) {
      return res.status(404).json({ err });
    }
  });
};
