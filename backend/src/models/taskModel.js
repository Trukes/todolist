const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    task_owner: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    closed_at: 
        {
            type: Date
        }
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

module.exports = mongoose.model("Task", taskSchema);