const Blog = require("../models/blogs.model");

const createNewBlog = async (req, res) => {
  try {
    // const newBlog = new Blog(req.body);
    // await newBlog.save();
    const newBlog = await Blog.create(req.body);
    res.status(201).send(newBlog);
  } catch (error) {
    if(error.code === 11000)
      return res.status(409).send({ message: "A blog with this title already exists" })
    if(error.errors)
      return res.status(400).send({ message: error.message })
    console.log(error)
    res.status(500).send({ message: "Something went wrong!" });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    res.send(await Blog.find({}));
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
  }
}

const getBlogById = async (req, res) => res.send(req.blog);

const updateBlogById = async (req, res) => {
  try {
    // const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, { 
    //   new: true,
    //   // returnDocument: "after"
    // });
    const updatedBlog = await Blog.findOneAndUpdate({ _id: req.blog._id }, req.body, { 
      new: true,
    });
    res.send(updatedBlog)
  } catch (error) {
    if(error.kind === "ObjectId")
      return res.status(422).send({ message: 'Invalid blogId' })
    res.status(500).send({ message: "Something went wrong!" });
  }
}

const deleteBlogById = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.blog._id);
    res.sendStatus(204);
    // res.send({ message: `Blog with id: '${blogId}' was successfully deleted` });
  } catch (error) {
    if(error.kind === "ObjectId")
      return res.status(422).send({ message: 'Invalid blogId' })
    res.status(500).send({ message: "Something went wrong!" });
  }
}

const searchBlogs = async (req, res) => {
  //author -> give me all the blogs where one of the authors has the `author` email address
  const { title, author } = req.query;
  
  const titleQuery = { title: { $regex: new RegExp(title), $options: 'i' } }
  const authorQuery = { author: { $elemMatch: { email: author } } }

  if(title && author)
    return res.send(await Blog.find({ $and: [ titleQuery, authorQuery] }))
  if(title)
    return res.send(await Blog.find(titleQuery));
  if(author)
    return res.send(await Blog.find(authorQuery));
  
  return res.status(422).send({ message: "At least one of title or author must be passed" })
}

module.exports = { createNewBlog, getAllBlogs, getBlogById, updateBlogById, deleteBlogById, searchBlogs };
