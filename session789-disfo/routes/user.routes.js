const router = require("express").Router();
const {
  getAllUsers,
  postRegister,
  getUserByUsername,
} = require("../controllers/user.controller");
const { checkAdminKey } = require("../middlewares/admin.middleware");
const { userValidationSchema } = require("../validations/user.validator");
const { validateSchema } = require("../middlewares/validate.middleware");

const validateUser = validateSchema(userValidationSchema);

router.post("/register", validateUser, postRegister);
router.get("/all", checkAdminKey, getAllUsers);
router.get("/:username", getUserByUsername);

module.exports = router;
