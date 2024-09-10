const queryValidator = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.query);
  if (error) return res.status(422).send({ message: error.details[0].message });
  next();
};

const blogIdValidator = (req, res, next) => {
  const { blogId } = req.params.blogId;
  const validIdPattern = new RegExp(/[a-f0-9]{24}/);
  if(!validIdPattern.test(blogId))
    return res.status(422).send({ message: 'Invalid blogId' })
  next()
}

module.exports = { queryValidator, blogIdValidator };
