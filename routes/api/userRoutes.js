// Call router and all functions from userController file
const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// default route: api/users
// gets users and creates a new user
router.route('/').get(getUsers).post(createUser);

// api/users/:userId
// gets single user, updates user, and deletes a user by id
router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// api/users/:userId/friends
// adds a friend to user
router.route('/:userId/friends').post(addFriend);

// api/users/:userId/friends/:friendId
// removes a friend from user by id
router.route('/:userId/friends/:friendId').delete(removeFriend);

// export router
module.exports = router;