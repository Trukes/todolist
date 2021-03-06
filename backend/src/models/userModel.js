const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authConfig } = require("../config/config.js");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: [true, "username is required"],
        unique: true
    },
    password: {
        type: String, 
        required: [true, "password is required"],
        minlength: [4, "password should have at least 5 chars"]
    }
});

// validate username if exists
userSchema.path("username").validate(async (username) => {
    const count = await mongoose.model("User").count({username}); 
    if(count > 0){
        return false;
    }
    return true;
}, "username is already used");

// hash password
userSchema.pre("save", async function(next){
    try {        
        const user = this;
        let pass = user.password;
        let salt = parseInt(process.env.SALT_HASH) || 10;
        let hash = await bcrypt.hash(pass, salt);
        
        user.password = hash;

        // TODO :: generate avatar

        return next();
    } catch(e){
        return next(e);
    }
});
  
/**
 * 
 * @param {String} password password sent to verify auth
 */
userSchema.methods.checkPassword = async function(password){
    if(!password) return false;

    let validator = await bcrypt.compare(password, this.password);
    return validator;
};

userSchema.methods.generateToken = function () {
    return jwt.sign({user: this}, authConfig.secret);
};
module.exports = mongoose.model("User", userSchema);