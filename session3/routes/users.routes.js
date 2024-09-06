const router = require("express").Router();
const {
  getUsers,
  getUserById,
  searchUsers,
} = require("../controllers/users.controllers");

router.get("/", getUsers);
router.get("/search", searchUsers);
router.get("/:uuid", getUserById);

module.exports = router;
