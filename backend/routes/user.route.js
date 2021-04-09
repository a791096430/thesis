const express = require("express");
const router = express.Router();
let User = require("../models/user.model");

router.post("/add", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });
  user
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:username", (req, res) => {
  User.findOne({
    username: req.params.username,
  })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/update/profile/:username", (req, res) => {
  User.findOneAndUpdate(
    {
      username: req.params.username,
    },
    {
      email: req.body.email,
      state: req.body.state,
      city: req.body.city,
      neighborhood: req.body.neighborhood,
      address: req.body.address,
      phone: req.body.phone,
    },
    { new: true }
  )
    .then((user) => res.json(user))
    .catch((err) => status(400).json("Error: " + err));
});

router.post("/update/password/:username", (req, res) => {
  User.findOneAndUpdate(
    {
      username: req.params.username,
    },
    {
      password: req.body.password,
    },
    { new: true }
  )
    .then((user) => res.json(user))
    .catch((err) => status(400).json("Error: " + err));
});

router.post("/update/positiveComment/:username", (req, res) => {
  User.findOneAndUpdate(
    {
      username: req.params.username,
    },
    {
      $push: { positiveComments: req.body.comment },
    },
    { new: true }
  )
    .then((user) => res.json(user))
    .catch((err) => status(400).json("Error: " + err));
});

router.post("/update/negativeComment/:username", (req, res) => {
  User.findOneAndUpdate(
    {
      username: req.params.username,
    },
    {
      $push: { negativeComments: req.body.comment },
    },
    { new: true }
  )
    .then((user) => res.json(user))
    .catch((err) => status(400).json("Error: " + err));
});

// router.post("/update/positiveComment/:username", (req, res) => {
//   User.findOneAndUpdate(
//     {
//       username: req.params.username,
//     },
//     {
//       positiveComments: req.body.comment,
//     },
//     { new: true }
//   )
//     .then((user) => res.json(user))
//     .catch((err) => status(400).json("Error: " + err));
// });

router.post("/login", (req, res) => {
  User.find({ username: req.body.username, password: req.body.password })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
});

module.exports = router;
