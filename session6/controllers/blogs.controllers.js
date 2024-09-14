const BlogService = require("../services/blog.service");
const BlogServiceInstance = new BlogService();

const createNewBlog = async (req, res) => {
  try {
    const newBlog = await BlogServiceInstance.create(req.body)
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
    res.send(await BlogServiceInstance.getAll());
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!" });
  }
}

const getBlogById = async (req, res) => res.send(req.blog);

const updateBlogById = async (req, res) => {
  try {
    const updatedBlog = await BlogServiceInstance.updateById(req.params.blogId, req.body)
    res.send(updatedBlog)
  } catch (error) {
    if(error.kind === "ObjectId")
      return res.status(422).send({ message: 'Invalid blogId' })
    res.status(500).send({ message: "Something went wrong!" });
  }
}

const deleteBlogById = async (req, res) => {
  try {
    await BlogServiceInstance.deleteById(req.blog._id);
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

  if(title && author)
    return res.send(await BlogServiceInstance.queryByAuthorAndTitle(title, author));
  if(title)
    return res.send(await BlogServiceInstance.queryByTitle(title));
  if(author)
    return res.send(await BlogServiceInstance.queryByAuthor(author));
}

module.exports = { createNewBlog, getAllBlogs, getBlogById, updateBlogById, deleteBlogById, searchBlogs };
