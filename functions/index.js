const express = require("express");
const app = express();
const firebase = require("firebase");
const mongoose = require("mongoose");
const keys = require("./Config/pro");
const cors = require("cors");
var admin = require("firebase-admin");
const bodyParser = require("body-parser");
const functions = require("firebase-functions");
const passport = require("passport");
const firebaseConfig = require("./Config/FrebaseConfig");
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoKey);

var serviceAccount = require("./Config/admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://earthgreenrock.firebaseio.com"
});
app.use(cors());
// Init app
firebase.initializeApp(firebaseConfig);

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use("/uploads", express.static("uploads"));
require("./Models/Courses");
require("./Models/User");
require("./Models/Products");

require("./Services/Passport");

require("./Routes/Courses")(app);
require("./Routes/Login")(app);
require("./Routes/events")(app);

exports.api = functions.https.onRequest(app);
