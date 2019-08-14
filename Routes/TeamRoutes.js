const multer = require("multer");
const mongoose = require("mongoose");
const teamSchema = mongoose.model("team");

module.exports = app => {
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function(req, file, cb) {
      cb(null, "-" + Date.now() + file.originalname);
    }
  });
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg")
      cb(null, true);
    cb(null, false);
  };
  const upload = multer({
    storage,
    limits: {
      fileSize: 1024 * 1024 * 3
    },
    fileFilter
  });
  app.post("/team", upload.single("teamMemberImg"), async (req, res) => {
    console.log(req.file);
    await new teamSchema({
      name: req.body.name,
      desc: req.body.desc,
      img: req.file.path
    }).save();
    return res.send({ mag: "Keith" });
  });
};
