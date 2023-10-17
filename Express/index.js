const express = require("express");

const app = express();

// Listen For Requests
app.listen(3000);

// Reguests
app.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
});
app.get("/aboutus", (req, res) => {
  res.status(200).sendFile("./views/aboutus.html", { root: __dirname });
});

// Redirect
app.get("/about-us", (req, res) => {
  res.status(301).redirect("/aboutus");
});

// 404
// .use uses a middleware & fires in every request
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});
