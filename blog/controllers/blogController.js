const BlogModel = require("../models/blog");

const add_new_blog = (req, res) => {
  const blogModel = new BlogModel(req.body);

  blogModel
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => res.send(err));
};

const get_all_blogs = (req, res) => {
  const blogModel = BlogModel;

  blogModel
    .find()
    .then((result) =>
      res.render("index", { title: "All Blogs", blogs: result })
    )
    .catch((err) => res.send(err));
};

const get_create_page = (req, res) => {
  res.render("create", { title: "Create a new blog" });
};

const get_single_blog = (req, res) => {
  const blogModel = BlogModel;

  blogModel
    .findById(req.params.id)
    .then((result) =>
      res.render("details", { title: result.title, blog: result })
    )
    .catch((err) => res.status(404).render("404", { title: "Blog Not Found" }));
};

const delete_single_blog = (req, res) => {
  const blogModel = BlogModel;

  blogModel
    .findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => res.send(err));
};

module.exports = {
  add_new_blog,
  get_all_blogs,
  get_create_page,
  delete_single_blog,
  get_single_blog,
};
