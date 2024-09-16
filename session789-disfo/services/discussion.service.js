const Discussion = require("../models/discussion.model");

class DiscussionService {
  findWithId = async (id) => {
    try {
      const result = await Discussion.findById(id);
      return result;
    } catch (error) {
      throw error;
    }
  };

  findForUsername = async (username) => {
    try {
      const result = await Discussion.find({ author: username });
      return result;
    } catch (error) {
      throw error;
    }
  };

  findAll = async () => {
    try {
      const discussionRes = await Discussion.find({});
      return discussionRes;
    } catch (error) {
      throw error;
    }
  };

  create = async (discussion) => {
    try {
      const { author, title, content, comments } = discussion;
      const newDiscussion = new Discussion({
        author,
        title,
        content,
        comments,
      });
      const result = await newDiscussion.save();
      return result;
    } catch (error) {
      throw error;
    }
  };

  addComment = async (comment, discussionId) => {
    try {
      const { author, content } = comment;
      const newComment = { author, content };
      const result = await Discussion.findOneAndUpdate(
        { _id: discussionId },
        { $push: { comments: newComment } },
        { new: true }
      );
      return result;
    } catch (error) {
      throw error;
    }
  };

  delete = async (discussionId) => {
    try {
      const result = await Discussion.findOneAndDelete({ _id: discussionId });
      return result;
    } catch (error) {
      throw error;
    }
  };

  update = async (discussionId, changes) => {
    try {
      const result = await Discussion.findOneAndUpdate(
        { _id: discussionId },
        changes,
        { new: true }
      );
      return result;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = DiscussionService;
