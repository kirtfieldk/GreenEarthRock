const multer = require("multer");
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
module.exports = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 3
  },
  fileFilter
});
