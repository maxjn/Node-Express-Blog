const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const BlogModel = require("./models/blog");
const { result } = require("lodash");

require("dotenv").config();

// express app
const app = express();

mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connected To DB");
    // listen for requests after connecting to DB
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");
// app.set('views', 'myviews');

// First Middleware & static files
app.use(express.static("public"));
app.use(morgan("dev"));
// To get Form data
app.use(express.urlencoded({ extended: true }));

// API Routes
app.post("/blogs", (req, res) => {
  const blogModel = new BlogModel(req.body);

  blogModel
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => res.send(err));
});

app.get("/blogs", (req, res) => {
  const blogModel = BlogModel;

  blogModel
    .find()
    .then((result) =>
      res.render("index", { title: "All Blogs", blogs: result })
    )
    .catch((err) => res.send(err));
});

app.get("/blogs/:id", (req, res) => {
  const blogModel = BlogModel;

  blogModel
    .findById(req.params.id)
    .then((result) =>
      res.render("details", { title: result.title, blog: result })
    )
    .catch((err) => res.send(err));
});

app.delete("/blogs/:id", (req, res) => {
  const blogModel = BlogModel;

  blogModel
    .findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => res.send(err));
});

// View Routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// Second Middleware
app.use((req, res, next) => {
  console.log("Second Middleware");
  next();
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
