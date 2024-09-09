const usersJSON = require("../users.json");

const getUsers = (req, res) => res.send(usersJSON.data);

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
