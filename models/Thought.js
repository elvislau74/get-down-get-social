// call required dependencies and model
const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate,
        },
        username: {
            type: String,
            required: true,
        },
        // returns an array of reactions utilizing the Reaction model
        reactions: [Reaction],
    },
    {
        // allow virtuals and getters to be included
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

// This virtual property 'reactionCount' gets the amount of reactions per thought
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

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

// Initialize the Thought model
const Thought = model('thought', thoughtSchema);

// Export the Thought model
module.exports = Thought;