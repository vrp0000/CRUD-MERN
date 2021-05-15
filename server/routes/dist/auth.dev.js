"use strict";

var express = require("express");

var router = express.Router();

var mongoose = require("mongoose");

var User = mongoose.model("User");
var Books = mongoose.model("Books");

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var _require = require("../keys"),
    JWT_SECRET = _require.JWT_SECRET;

var requiredLogin = require("../middleswares/protected");

router.get("/page", requiredLogin, function (req, res) {
  res.send("hello");
});
router.post("/books", requiredLogin, function (req, res) {
  var title = req.body.name;
  var books = new Books({
    title: title
  });
  books.save().then(function (books) {
    return res.status(200).json({
      message: "Saved in DB"
    });
  })["catch"](function (err) {
    return res.status(422).json({
      err: err
    });
  });
});
router.post("/signup", function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      email = _req$body.email,
      password = _req$body.password;
  if (!name || !email || !password) return res.status(422).json({
    error: "Please add all the fields"
  });
  User.findOne({
    email: email,
    name: name
  }).then(function (savedUser) {
    if (savedUser) {
      return res.status(422).json({
        error: "user already exists with that Email/Name"
      });
    }

    bcrypt.hash(password, 12).then(function (hashedpassword) {
      var user = new User({
        email: email,
        password: hashedpassword,
        name: name
      });
      user.save().then(function (user) {
        return res.json({
          message: "Saved successfully"
        });
      })["catch"](function (err) {
        return res.json({
          err: err
        });
      });
    });
  })["catch"](function (err) {
    return res.json({
      err: err
    });
  });
});
router.post("/login", function (req, res) {
  res.redirect(307, "/signin");
});
router.post("/signin", function (req, res) {
  console.log("/signin");
  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password;

  if (!email || !password) {
    res.status(422).json({
      error: "Email/Password missing"
    });
  }

  User.findOne({
    email: email
  }).then(function (savedUser) {
    if (!savedUser) {
      return res.status(422).json({
        error: "Invalid Email or password"
      });
    } else {
      bcrypt.compare(password, savedUser.password).then(function (result) {
        if (result) {
          console.log("Authentication Successfull");
          var token = jwt.sign({
            id: savedUser.id
          }, JWT_SECRET);
          res.json({
            token: token
          });
        } else {
          res.json({
            message: "Password is incorrect"
          });
        }
      })["catch"](function (err) {
        return res.json({
          err: err
        });
      });
    }
  });
});
module.exports = router;