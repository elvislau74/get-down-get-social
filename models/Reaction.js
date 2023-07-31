// call required dependencies with mongoose (Schema and Types classes)
const { Schema, Types } = require('mongoose');

// Schema to create Reaction model
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate,
        }
    },
    {
        // allow virtuals to be included
        toJSON: {
            getters: true,
        },
        id: false,
    },
);

// function to format the createdAt date
function formatDate(createdAt) {
    return createdAt.toLocaleDateString("en-US", {
        day: "2-digit",
        year: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
    });
};

// export the Reaction Schema
module.exports = reactionSchema;