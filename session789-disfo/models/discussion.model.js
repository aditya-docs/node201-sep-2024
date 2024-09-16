const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    author: { type: String, required: true, immutable: true },
    content: { type: String, required: true, maxlength: 500 },
  },
  { timestamps: true }
);

const discussionSchema = new mongoose.Schema(
  {
    title: { type: String, maxlength: 150, required: true },
    author: { type: String, required: true, immutable: true },
    content: { type: String, default: "" },
    comments: { type: [commentSchema], default: [] },
  },
  { timestamps: true }
);

const discussionModel = mongoose.model("Discussion", discussionSchema);

module.exports = discussionModel;
