// call required dependencies with mongoose (Schema class and model)
const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true, 
            unique: true,
            validate: {
                validator: function(v) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
                },
                message: props => `${props.value} is not a valid email!`
            },
        },
        // references thought model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        // self referencial
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            }
        ]
    },
    {
        // allow virtuals to be included
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// This virtual property 'friendCount' gets the amount of friends per user
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Initialize the User model
const User = model('user', userSchema);

// export the User model
module.exports = User;