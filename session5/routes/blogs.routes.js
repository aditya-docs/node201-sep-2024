const router = require("express").Router();
const { createNewBlog, getAllBlogs, getBlogById, updateBlogById, deleteBlogById } = require("../controllers/blogs.controllers");
// const { blogIdValidator } = require("../middlewares/validator");
const { findAndAttachBlog } = require("../middlewares/findAndAttachBlog");

router.post("/new", createNewBlog);
router.get("/", getAllBlogs);

router.route("/:blogId")
      .all(findAndAttachBlog)
      .get(getBlogById)
      .patch(updateBlogById)
      .delete(deleteBlogById);

module.exports = router;
