const http = require("http");
const fs = require("fs");

// Simple Routing
const readHTML = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      try {
        // 404
        if (err.code == "ENOENT") {
          const data = fs.readFileSync("./views/404.html", "utf8");
          res.statusCode = 404;
          res.end(data);
        }
        res.end();
      } catch (err) {
        res.end(err.toString());
      }
    } else {
      res.statusCode = 200;
      res.end(data);
    }
  });
};

const server = http.createServer((req, res) => {
  //   console.log("Request ", req);
  console.log("Url: ", req.url);
  console.log("Method: ", req.method);

  // set a header : content type
  res.setHeader("content-type", "text/html");

  let path = "./views" + req.url + ".html";
  readHTML(path, res);
});

server.listen(3000, "localhost", () => {
  console.log("Listening...");
});
