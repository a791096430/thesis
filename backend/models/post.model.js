const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    author: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      min: 0,
      max: 100000,
    },
    comments: [
      {
        user: { type: String },
        date: { type: String },
        comment: { type: String },
      },
      { timestamps: true },
    ],
    description: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
    },
    status: {
      type: String,
    },
    sellerOrBuyer: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
