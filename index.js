const express = require("express");
const app = express();
const mongoose = require("mongoose");
const keys = require("./Config/keys");
const passport = require("passport");
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoKey);

app.use(passport.initialize());
app.use(passport.session());
app.use("/uploads", express.static("uploads"));
require("./Models/TeamSchema");
require("./Models/User");

require("./Services/Passport");

require("./Routes/TeamRoutes")(app);
require("./Routes/Login")(app);

app.listen(5000);
