const { User } = require("../models/models");


exports.registerUser = async (req, res) => {
    try {
        const data = req.body;
        const user = await User.create(data);
        return res.status(200).send({ status: "OK", payload: user, message: "User created successufully" });
    } catch(e){
        return res.status(200).send({ status: "NOK", payload: e, message: "Internal error: Failed at user creation"});
    }
};