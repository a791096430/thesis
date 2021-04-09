const express = require("express");
const Post = require("../models/post.model");
const router = express.Router();

router.post("/add", (req, res) => {
  const post = new Post({
    type: req.body.type,
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    description: req.body.description,
    condition: req.body.condition,
    status: req.body.status,
    category: req.body.category,
    image: req.body.image,
  })
    .save()
    .then(res.json("post added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/get/:id", (req, res) => {
  //model.find returns an array as response!
  //model.findOneXXXX/findById returns a single json object!
  Post.findById(req.params.id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/find/type", (req, res) => {
  Post.find({
    author: req.body.author,
    type: req.body.type,
  }).then((post) => {
    res.json(post);
  });
});

router.post("/find/status", (req, res) => {
  Post.find({
    author: req.body.author,
    type: req.body.type,
    status: req.body.status,
  }).then((post) => {
    res.json(post);
  });
});

router.get("/find/sellerOrBuyer/:username", (req, res) => {
  Post.find({
    sellerOrBuyer: req.params.username,
  }).then((post) => {
    res.json(post);
  });
});

router.post("/search/:keyword", (req, res) => {
  //model.find returns an array as response!
  //model.findOneXXXX/findById returns a single json object!
  Post.find({
    $or: [
      //Fuzzy search using RegExp
      { title: new RegExp(req.params.keyword, "i") },
      { author: req.params.keyword },
      { description: new RegExp(req.params.keyword, "i") },
      { category: req.params.keyword },
    ],
  })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/get/dealtPost/:username", (req, res) => {
  Post.find({
    $or: [
      { sellerOrBuyer: req.params.username, status: "dealt" },
      { sellerOrBuyer: req.params.username, status: "commented" },
    ],
  })
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/update/info/:postid", (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.params.postid },
    {
      type: req.body.type,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      condition: req.body.condition,
      category: req.body.category,
      image: req.body.image,
    },
    { new: true }
  )
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/update/status/:postid", (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.params.postid },
    {
      status: req.body.status,
    },
    { new: true }
  )
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/update/sellerOrBuyer/:postid", (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.params.postid },
    {
      sellerOrBuyer: req.body.sellerOrBuyer,
    },
    { new: true }
  )
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/delete/:postid", (req, res) => {
  Post.findOneAndDelete({ _id: req.params.postid })
    .then(res.json("post deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/update/comment/:postid", (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.params.postid },
    {
      $push: { comments: req.body.comment },
    },
    { new: true }
  ).then((post) => {
    res.json(post);
  });
});

module.exports = router;
