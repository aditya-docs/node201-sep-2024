const router = require("express").Router();
const {
  getUsers,
  getUserById,
  searchUsers,
} = require("../controllers/users.controllers");
const userSearchSchema = require("../validations/searchUser");
const authorize = require("../middlewares/authorize");
const { queryValidator } = require("../middlewares/validator");

router.use(authorize);

router.get("/", getUsers);
router.get("/search", queryValidator(userSearchSchema), searchUsers);
router.get("/:uuid", getUserById);

module.exports = router;
