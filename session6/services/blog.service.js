const Blog = require("../models/blogs.model");

class BlogService {
    create = (payload) => Blog.create(payload);

    getAll = () => Blog.find({});
    
    getById = (blogId) => Blog.findById(blogId); // Blog.findOne({ _id: blogId });
    
    updateById = (blogId, payload) => Blog.findOneAndUpdate({ _id: blogId }, payload, { new: true });
    
    deleteById = (blogId) => Blog.findByIdAndDelete(blogId);
    
    queryByTitle = (title) => Blog.find({ title: { $regex: new RegExp(title), $options: 'i' } });
    
    queryByAuthor = (author) => Blog.find({ author: { $elemMatch: { email: author } } });
    
    queryByAuthorAndTitle = (title, author) => Blog.find({
        $and: [
            { title: { $regex: new RegExp(title), $options: 'i' } },
            { author: { $elemMatch: { email: author } } }
        ]
    })
}



module.exports = BlogService;