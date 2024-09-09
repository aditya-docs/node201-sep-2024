const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    author: [String],
    publishedAt: Date,
  },
  {
    timestamps: true,
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

const blogModel = mongoose.model("Blog", blogSchema, "blogs"); //(name of the model, schema to be used, name of the collection)

module.exports = blogModel;