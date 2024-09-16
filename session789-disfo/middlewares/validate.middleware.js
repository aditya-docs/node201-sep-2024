const validateSchema = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(422).json(error);
  } else {
    next();
  }
};

module.exports = { validateSchema };
