// Call all necessary models
const { User, Thought } = require('../models');

// export all user controllers to be routed/pathed
module.exports = {
    // Get all users (GET)
    // api/users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Get single user by Id (GET)
    // api/users/:userId
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({_id: req.params.userId})
                .select('-__v')
                .populate('thoughts')
                .populate('friends');

            if(!user) {
                return res.status(404).json({message: 'No user with that ID.'})
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Create a new user (POST)
    // api/users
    async createUser(req,res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Update a user (PUT)
    // api/users/:userId
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body},
                {runValidators: true, new: true}
            );

            if(!user) {
                return res.status(404).json({message: 'No user with that id!'});
            };

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Delete a user (DELETE)
    // api/users/:userId
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({_id: req.params.userId});

            if(!user) {
                return res.status(404).json({message: 'No such user exists!'});
            }

            await Thought.deleteMany({username: {$in: user.username}});
            res.json({message: 'User successfully deleted.'})
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Add a friend to user (POST)
    // api/users/:userId/friends
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet: {friends: req.body}},
                {runValidators: true, new: true}
            );

            if(!user) {
                return res.status(404).json({message: 'No user with that Id!'});
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Remove a friend from a user (DELETE)
    // api/users/:userId/friends/friendId
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: {friends: req.params.friendId}},
                {runValidators: true, new: true}
            );

            if(!user) {
                return res.status(404).json({message: "No user with that Id!"})
            };

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};