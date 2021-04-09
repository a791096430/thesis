const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema(
  {
    creator: {
      type: String,
      required: true,
    },
    recipient: {
      type: String,
      required: true,
    },
    creatorItems: [],
    creatorCurrency: {
      type: Number,
      required: true,
      min: 0,
    },
    recipientItems: [],
    recipientCurrency: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
