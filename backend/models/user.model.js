const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    email: {
      type: String,
      required: true,
    },
    reputationPoints: {
      type: Number,
      default: 0,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    neighborhood: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    positiveComments: [
      { user: "", postTitle: "", postId: "", postType: "", comment: "" },
      { timestamps: true },
    ],
    negativeComments: [
      { user: "", postTitle: "", postId: "", postType: "", comment: "" },
      { timestamps: true },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
