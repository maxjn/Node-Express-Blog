const express = require("express");
const {
  add_new_blog,
  get_all_blogs,
  get_create_page,
  get_single_blog,
  delete_single_blog,
} = require("../controllers/blogController");

const router = express.Router();

router.post("/", add_new_blog);

router.get("", get_all_blogs);

router.get("/create", get_create_page);

router.get("/:id", get_single_blog);

router.delete("/:id", delete_single_blog);

module.exports = router;
