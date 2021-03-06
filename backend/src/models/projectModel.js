const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    project_owner: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    tasks: 
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Task"
            }
        ],
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

module.exports = mongoose.model("Project", projectSchema);