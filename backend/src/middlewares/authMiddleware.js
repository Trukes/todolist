const jwt = require("jsonwebtoken");
const { authConfig } = require("../config/config.js");
const { BlackListToken } = require("../models/models");

/**
 * validate token on header
 * @param {*} req expectes on header a token on x-access-token
 * @param {*} res returns false if is not ok
 * @param {*} next continues if its ok
 */
exports.verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({stauts: "NOK", token: token, payload: "Token was not provided"});
    }

    // validate blacked list token
    let tokenBlacklist = await BlackListToken.find({token: token});
    if(tokenBlacklist.length > 0)
        return res.status(403).send({status: "NOK", payload: "Token unauthorized and disabled"});

    // validate token with jwt and get user
    let data;
    try{
        data = jwt.verify(token, authConfig.secret);
    } catch(err){
        return res.status(403).send({status: "NOK", payload: "Token unauthorized"});
    }

    req.userAuth = data.user;
    next();
};
