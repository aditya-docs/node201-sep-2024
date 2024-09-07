const usersJSON = require("../users.json");
const userSearchSchema = require("../validations/searchUser");

const getQueryErrors = (schema, data) => {
  const result = schema.validate(data);
  return result.error;
};

const getUsers = (req, res) => {
  if (req.headers.authorization === process.env.password)
    return res.send(usersJSON.data);
  res
    .status(401)
    .send({ message: "You are not authorized to view the resource" });
};

const getUserById = async (req, res) => {
  const reqUser = usersJSON.data.find(
    (user) => user.login.uuid === req.params.uuid
  );
  if (reqUser) return res.send(reqUser);
  res
    .status(404)
    .send({ message: "User with this login id could not be found" });
};

const searchUsers = (req, res) => {
  const { gender, age } = req.query;

  const error = getQueryErrors(userSearchSchema, { gender, age });
  if (error) return res.status(422).send({ message: error.details[0].message });

  // if (gender && !validGenders.includes(gender))
  //   return res
  //     .status(422)
  //     .send({ message: "gender must be either 'male' or 'female'" });
  // if ((age && isNaN(age)) || age < 0 || age > 100)
  //   return res
  //     .status(422)
  //     .send({ message: "age must be a number between 0 and 100" });

  if (gender && age)
    return res.send(
      usersJSON.data.filter(
        (user) => user.gender === gender && user.dob.age === Number(age)
      )
    );
  if (gender)
    return res.send(usersJSON.data.filter((user) => user.gender === gender));
  if (age)
    return res.send(
      usersJSON.data.filter((user) => user.dob.age === Number(age))
    );
};

module.exports = { getUsers, getUserById, searchUsers };
