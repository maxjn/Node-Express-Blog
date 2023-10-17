const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema / data structure
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create Model / to communicate
const Blog = mongoose.model('Blog',blogSchema)

module.exports = Blog;