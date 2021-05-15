"use strict";

module.exports = {
  MONGOURI: "mongodb+srv://vinay:fIbUNGvV9VYHjOKE@cluster0.zrkqc.mongodb.net/bookstore?retryWrites=true&w=majority",
  JWT_SECRET: "qpwoeiruty"
};
/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://vinay:fIbUNGvV9VYHjOKE@cluster0.zrkqc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
}) */