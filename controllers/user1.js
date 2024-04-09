const {v4:uuidv4}= require("uuid");

const User = require("../models/user");
const {setUser}=require("../service/auth");

async function handleGetSignUp (req,res) {
    const { name, email,password } = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}
async function handleGetLogIn(req,res){
    const { email, password } = req.body;
    const user = await User.find({ email,password});
    if(!user)
        return res.render("login",{
            error : "Invalid email or Password",
        });

    //const sessionId = uuidv4();
    //setUser(sessionId,user);
    const token = setUser(user);
    res.cookie("uid",token);
    return res.redirect("/");
}

module.exports = {
    handleGetSignUp,
    handleGetLogIn,
};