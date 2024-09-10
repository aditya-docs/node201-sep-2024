const Blog = require("../models/blogs.model");

const findAndAttachBlog = async (req, res, next) => {
    const { blogId } = req.params;
    try {
      const reqBlog = await Blog.findById(blogId);
      // const reqBlog = await Blog.findOne({ _id: blogId });
      if (!reqBlog)
        return res.status(404).send({ message: `Blog with id: '${blogId}' could not be found` })
      req.blog = reqBlog;
      next();
    } catch (error) {
      if(error.kind === "ObjectId")
        return res.status(422).send({ message: 'Invalid blogId' })
      res.status(500).send({ message: "Something went wrong!" });
    }
}

module.exports = { findAndAttachBlog } 