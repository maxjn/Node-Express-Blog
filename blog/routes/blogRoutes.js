const express = require("express");
const BlogModel = require("../models/blog");


const router = express.Router();

router.post("/", (req, res) => {
    const blogModel = new BlogModel(req.body);
  
    blogModel
      .save()
      .then((result) => {
        res.redirect("/blogs");
      })
      .catch((err) => res.send(err));
  });
  
  router.get("", (req, res) => {
    const blogModel = BlogModel;
  
    blogModel
      .find()
      .then((result) =>
        res.render("index", { title: "All Blogs", blogs: result })
      )
      .catch((err) => res.send(err));
  });
  
  router.get("/create", (req, res) => {
    res.render("create", { title: "Create a new blog" });
  });

  router.get("/:id", (req, res) => {
    const blogModel = BlogModel;
  
    blogModel
      .findById(req.params.id)
      .then((result) =>
        res.render("details", { title: result.title, blog: result })
      )
      .catch((err) => res.send(err));
  });
  
  router.delete("/:id", (req, res) => {
    const blogModel = BlogModel;
  
    blogModel
      .findByIdAndDelete(req.params.id)
      .then((result) => {
        res.json({ redirect: "/blogs" });
      })
      .catch((err) => res.send(err));
  });

  module.exports = router