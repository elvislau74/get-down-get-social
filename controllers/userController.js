const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({_id: req.params.userId})
                .select('-__v')
                .populate('thoughts', 'users');

            if(!user) {
                return res.status(404).json({message: 'No user with that ID.'})
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async createUser(req,res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

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

    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: {friends: {_id: req.params.friendId}}},
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