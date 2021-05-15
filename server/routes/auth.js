const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Books = mongoose.model("Books")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require("../keys")
const requiredLogin = require("../middleswares/protected")

router.get("/page", requiredLogin, (req, res) =>
{
  res.send("hello");
});

router.post("/books", requiredLogin, (req, res) =>
{

  const title = req.body.name

  const books = new Books({ title })
  books.save().then((books) =>
  {
    return res.status(200).json({ message: "Saved in DB" })
  })
    .catch(err =>
    {

      return res.status(422).json({ err })
    })
})

router.post("/signup", (req, res) =>
{
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(422).json({
      error: "Please add all the fields",
    });


  User.findOne({
    email: email,
    name: name,
  })
    .then(savedUser =>
    {
      if (savedUser) {
        return res.status(422).json({
          error: "user already exists with that Email/Name",
        })
      }

      bcrypt.hash(password, 12).then(hashedpassword =>
      {

        const user = new User({
          email,
          password: hashedpassword,
          name,
        });

        user
          .save()
          .then(user =>
            res.json({
              message: "Saved successfully",
            })
          )
          .catch(err => res.json({ err }));


      })

    })
    .catch(err => res.json({ err }));

});

router.post("/login", (req, res) =>
{
  res.redirect(307, "/signin")
})

router.post("/signin", (req, res) =>
{
  console.log("/signin")
  const { email, password } = req.body
  if (!email || !password) {
    res.status(422).json({ error: "Email/Password missing" })
  }

  User.findOne({ email: email }).then((savedUser) =>
  {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid Email or password" })
    }
    else {
      bcrypt.compare(password, savedUser.password)
        .then((result) =>
        {
          if (result) {
            console.log("Authentication Successfull")
            const token = jwt.sign({ id: savedUser.id }, JWT_SECRET)
            res.json({ token })
          }
          else {
            res.json({ message: "Password is incorrect" })
          }
        })
        .catch(err =>
        {
          return res.json({ err })
        })
    }
  })
})


router.get("/getbooks", (req, res) =>
{
  console.log("/getbooks")
  Books.find()
    .then((booklist) =>
    {
      if (booklist != undefined) {
        return res.status(200).json({ booklist })
      }
    }).catch(err =>
    {
      return res.json({ error: err })
    })

})


router.post("/addbooks", (req, res) =>
{
  console.log("/addbooks")

  const { title, price, author, description, category } = req.body
  if (!title || !price || !author || !description || !category) {
    return res.status(422).json({ error: "Please fill up all fields" })
  }

  Books.findOne({ title })
    .then(savedBook =>
    {
      if (savedBook) {
        return res.status(200).json({
          error: "Book already exists in the Database",
        })
      }
      const books = new Books({ title, price, author, description, category })
      books.save()
        .then(books =>
        {
          return res.status(200).json({ message: "Saved Successfully" })
        })
        .catch(error =>
        {
          return res.status(500).json({ message: "Failed to Save. Please try again" })
        })
    })

})


router.post("/deletebook", (req, res) =>
{
  console.log("/deletebook")
  const { _id } = req.body
  if (!_id) {
    return res.status(422).json({ error: "Please fill up all fields" })
  }

  Books.findOne({ _id })
    .then(resp =>
    {
      if (resp == null) {
        return res.status(200).json({ message: "Not present in DB" })
      }
      else
        Books.deleteOne({ title: resp.title }, (error) =>
        {
          if (!error) {
            return res.status(200).json({
              message: "Deleted",
            })
          }
        }
        )
    })
})


router.post("/updatebook", (req, res) =>
{
  console.log("/updatebooks")
  const { title, price, author, description, category, rating } = req.body
  if (!title || !price || !author || !description || !category) {
    return res.status(422).json({ error: "Please fill up all fields" })
  }

  Books.findOne({ title })
    .then(savedBook =>
    {
      if (savedBook == null) {
        return res.status(200).json({ message: "Not present in DB" })
      }
      else {
        Books.updateOne({ title, price, author, description, category, rating }, error =>
        {
          if (error) {
            return res.status(200).json({ message: "Update Failed" })
          }
          return res.status(200).json({ message: "Saved Successfully" })
        })
      }
    })
})

router.post("/getbookdata", (req, res) =>
{

  if (req.body.title === "") {
    return res.status(422).json({ error: "Please provide book name" })
  }
  Books.findOne({ title: req.body.title })
    .then((bookdata) =>
    {
      if (bookdata != undefined) {
        return res.status(200).json({ bookdata })
      }
      else {
        return res.status(200).json({ message: "No record found" })
      }
    }).catch(err =>
    {
      return res.json({ error: err })
    })


})

module.exports = router;
