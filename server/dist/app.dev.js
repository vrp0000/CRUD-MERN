"use strict";

var express = require("express");

var app = express();

var mongoose = require("mongoose");

var _require = require("./keys"),
    MONGOURI = _require.MONGOURI;

var port = 5000;
mongoose.connect(MONGOURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
mongoose.connection.on("connected", function () {
  console.log("Connected yo MOngo DB");
});
mongoose.connection.on("error", function (err) {
  console.log("Error connecting ");
});

require("./Db/user");

require("./Db/Books");

app.use(express.json());
app.use(require("./routes/auth"));
app.listen(port, function () {
  console.log("Server is running on ", port);
});