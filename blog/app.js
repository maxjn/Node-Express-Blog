const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRouter = require("./routes/blogRoutes");

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
    app.listen(process.env.PORT || 8000);
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
app.use("/blogs", blogRouter);

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

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
