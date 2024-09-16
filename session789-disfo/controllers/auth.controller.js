const AuthService = require("../services/auth.service");
const AuthServiceInstance = new AuthService();

const postSignup = async (req, res) => {
    try {
        res.send(await AuthServiceInstance.signup(req.body))
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Something went wrong!" })
    } 
}

module.exports = { postSignup };