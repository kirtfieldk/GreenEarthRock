const express = require("express");
const app = express();
const mongoose = require("mongoose");
const keys = require("./Config/pro");
const bodyParser = require("body-parser");
const passport = require("passport");
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoKey);
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use("/uploads", express.static("uploads"));
require("./Models/TeamSchema");
require("./Models/User");
require("./Models/EventSchema");

require("./Services/Passport");
app.get("/", (req, res) => {
  return res.send("Keith");
});
require("./Routes/TeamRoutes")(app);
require("./Routes/Login")(app);
require("./Routes/events")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server Started"));
