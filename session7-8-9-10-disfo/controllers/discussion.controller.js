const DiscussionService = require("../services/discussion.service");
const DiscussionServiceInstance = new DiscussionService();

const findDiscussionById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await DiscussionServiceInstance.findWithId(id);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: `Discussion with id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: "Could not fetch this discussion", id });
  }
};

const findDiscussionsByUser = async (req, res) => {
  try {
    const { username } = req.params;
    const result = await DiscussionServiceInstance.findForUsername(username);
    if (result.length) {
      res.json(result);
    } else {
      res
        .status(404)
        .json({ message: `No discussions found for user: ${username}` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not fetch discussions of this user", username });
  }
};

const getAllDiscussions = async (req, res) => {
  try {
    const discussionRes = await DiscussionServiceInstance.findAll();
    if (discussionRes.length) {
      res.json(discussionRes);
    } else {
      res.status(404).json({ message: "No Discussions found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching discussions", error });
  }
};

const createNewDiscussion = async (req, res) => {
  try {
    const result = await DiscussionServiceInstance.create(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create new discussion",
      title: req.body.title,
      error,
    });
  }
};

const addNewComment = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await DiscussionServiceInstance.addComment(req.body, id);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add comment to this discussion",
      discussion_id: id,
      error,
    });
  }
};

const deleteDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await DiscussionServiceInstance.delete(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete this discussion",
      discussion_id: id,
      error,
    });
  }
};

const updateDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await DiscussionServiceInstance.update(id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update this discussion",
      discussion_id: id,
      error,
    });
  }
};

module.exports = {
  findDiscussionById,
  findDiscussionsByUser,
  createNewDiscussion,
  getAllDiscussions,
  addNewComment,
  deleteDiscussion,
  updateDiscussion,
};
