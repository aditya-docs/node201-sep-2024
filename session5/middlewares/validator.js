const queryValidator = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.query);
  if (error) return res.status(422).send({ message: error.details[0].message });
  next();
};

// function validator(schema) {
//   return function (req, res, next) {
//     const { gender, age } = req.query;
//     const { error } = schema.validate({ gender, age });
//     if (error)
//       return res.status(422).send({ message: error.details[0].message });
//     next();
//   };
// }

module.exports = queryValidator;
