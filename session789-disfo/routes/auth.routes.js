const router = require("express").Router();
const { postSignup } = require("../controllers/auth.controller");
const { userValidationSchema } = require("../validations/user.validator");
const { validateSchema } = require("../middlewares/validate.middleware");

const validateUser = validateSchema(userValidationSchema)

router.post("/signup", validateUser, postSignup)

module.exports = router;