const router = require("express").Router();
const { createNewBlog } = require("../controllers/blogs.controllers");

router.post("/new", createNewBlog);

module.exports = router;
