const express = require("express");
const app = express();
const firebase = require("firebase");
const mongoose = require("mongoose");
const keys = require("./Config/pro");
const bodyParser = require("body-parser");
const functions = require("firebase-functions");
const passport = require("passport");
const firebaseConfig = require("./Config/FrebaseConfig");
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoKey);

// Init app
firebase.initializeApp(firebaseConfig);

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

exports.api = functions.https.onRequest(app);
