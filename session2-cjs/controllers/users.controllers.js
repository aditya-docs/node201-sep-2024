const usersJSON = require("../users.json");
// const axios = require("axios");

const getUsers = (req, res) => res.send(usersJSON.data);

const getUserById = async (req, res) => {
  //   const usersJSON = (
  //     await axios.get(
  //       "https://gitlab.crio.do/public_content/node-js-sessions/-/raw/master/users.json"
  //     )
  //   ).data;
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
  else if (gender)
    return res.send(usersJSON.data.filter((user) => user.gender === gender));
  else if (age)
    return res.send(
      usersJSON.data.filter((user) => user.dob.age === Number(age))
    );
  else
    res
      .status(400)
      .send({ message: "One of 'gender' or 'age' must be passed" });
};

module.exports = { getUsers, getUserById, searchUsers };
