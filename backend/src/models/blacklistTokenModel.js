const mongoose = require("mongoose");

const blacklistTokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("BlackListToken", blacklistTokenSchema);