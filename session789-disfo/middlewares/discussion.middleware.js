const DiscussionService = require("../services/discussion.service");
const DiscussionServiceInstance = new DiscussionService();

const fetchDiscussion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const discussionToUpdate = await DiscussionServiceInstance.findWithId(id);
    if (discussionToUpdate) {
      next();
    } else {
      res
        .status(404)
        .json({ message: "Discussion not found", discussionId: id });
    }
  } catch (error) {
    res.status(404).json({
      message: "Invalid Discussion id",
      id: req.params.id,
      error,
    });
  }
};

const verifyAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { author } = req.body;
    const resourceToDelete = await DiscussionServiceInstance.findWithId(id);
    if (resourceToDelete) {
      if (resourceToDelete.author === author) {
        next();
      } else {
        res.status(403).json({
          message: "Resource does not belong to author",
          id,
          author,
        });
      }
    } else {
      res.status(404).json({ message: "Resource not found", id });
    }
  } catch (error) {
    res.status(500).json({
      message: "Could not verify author",
      id: req.params.id,
      error,
    });
  }
};

module.exports = { fetchDiscussion, verifyAuthor };
