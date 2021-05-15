"use strict";

var jwt = require('jsonwebtoken');

var secret = require("../keys").JWT_SECRET;

var mongoose = require("mongoose");

var User = mongoose.model("User");

module.exports = function (req, res, next) {
  var authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      error: "You need to be logged in"
    });
  }

  var token = authorization.replace("Bearer ", "");
  jwt.verify(token, secret, function (err, payload) {
    //Checking if the token is valid
    if (err) {
      return res.json({
        error: err
      }).status(401);
    } //Getting user details by ID


    var id = payload.id;
    User.findById(id).then(function (userdata) {
      //Storing user data in request's user parameter
      req.user = userdata;
      next();
    });
  });
};