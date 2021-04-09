const express = require("express");
const router = express.Router();
const Offer = require("../models/offer.model");

router.post("/add", (req, res) => {
  const offer = new Offer({
    creator: req.body.creator,
    creatorItems: req.body.creatorItems,
    creatorCurrency: req.body.creatorCurrency,
    recipient: req.body.recipient,
    recipientItems: req.body.recipientItems,
    recipientCurrency: req.body.recipientCurrency,
    status: req.body.status,
    message: req.body.message,
  })
    .save()
    .then(res.json("offer sent"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:offerid", (req, res) => {
  Offer.findOne({ _id: req.params.offerid })
    .then((offer) => res.json(offer))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/search/recipient", (req, res) => {
  Offer.find({ recipient: req.body.user })
    .then((offer) => res.json(offer))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/search/creator", (req, res) => {
  Offer.find({ creator: req.body.user })
    .then((offer) => res.json(offer))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/update/:offerid", (req, res) => {
  Offer.findOneAndUpdate(
    { _id: req.params.offerid },
    {
      creator: req.body.creator,
      creatorItems: req.body.creatorItems,
      creatorCurrency: req.body.creatorCurrency,
      recipient: req.body.recipient,
      recipientItems: req.body.recipientItems,
      recipientCurrency: req.body.recipientCurrency,
      status: req.body.status,
    },
    { new: true }
  )
    .then((offer) => res.json(offer))
    .catch((err) => res.status(400).json(err));
});

router.post("/updateStatus/:offerid", (req, res) => {
  Offer.findOneAndUpdate(
    { _id: req.params.offerid },
    {
      status: req.body.status,
    },
    { new: true }
  )
    .then((offer) => res.json(offer))
    .catch((err) => res.status(400).json(err));
});

router.get("/get/offerMade/:username", (req, res) => {
  Offer.find({
    $or: [
      { creator: req.params.username, status: "accepted" },
      { recipient: req.params.username, status: "accepted" },
    ],
  })
    .then((offer) => res.json(offer))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
