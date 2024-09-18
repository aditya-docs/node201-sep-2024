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

const postLogin = async (req, res) => {
    try {
        const { isLoggedIn, token } = await AuthServiceInstance.login(req.body)
        if(!isLoggedIn)
            return res.status(401).send({ message: "One of username or password is incorrect" })
        res.cookie("remember_user_token", token, { 
                maxAge: 15000, 
                httpOnly: true 
            })
            .send({ isLoggedIn })        
    } catch (error) {
        if(error.message === "UserNotFound")
            return res.status(401).send({ message: "One of username or password is incorrect" })
        console.log(error)
        res.status(500).send({ message: "Something went wrong!" })
    } 
}

module.exports = { postSignup, postLogin };