const { User, BlackListToken } = require("../models/models");

/**
 * Log user in sending a valid token
 * @param {username, password} req user inputs for login
 * @param {token} res response with jwt token
 */
exports.loginUser = async (req, res) => {
    const data = req.body;
    const user = await User.findOne({username: data.username});
            
    if(!user)
        return res.status(200).send({status: "NOK", payload: [], message: "User not found"}); 
            
    let validatePassword =  await user.checkPassword(data.password);
    
    if(!validatePassword)
        return res.status(200).send({status: "NOK", payload: [], message: "Password it's incorrect"}); 

    let token = user.generateToken();
    return res.status(200).send({status: "OK", payload: {token: token, userdata: {name: user.name, username: user.username}}, message: "Login successufully"});
};
        
exports.logoutUser = async (req, res) => {
    // TODO :: GET TOKEN
    let token = req.headers["x-access-token"];

    let responseCreate = await BlackListToken.create({token: token});
    if(!responseCreate)
        return res.status(200).send({status: "NOK", payload: [], message: "user can't log out"});

    // TODO :: ADD TO BLACKLIST
    return res.status(200).send({status: "OK", payload: [], message: "user logged out"});
};

exports.validateToken = async (req, res) => {
    return res.status(200).send({ status: "OK", payload: {}, message: "You are ok mate"});
};