// Call router and all functions from thoughtController file
const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');

// default route: api/thoughts
// gets users and creates a new user
router.route('/').get(getThoughts).post(createThought);

// api/thoughts/:thoughtId
// gets single thought, updates thought, and deletes a thought by id
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// api/thoughts/:thoughtId/reactions
// adds a reaction to a thought
router.route('/:thoughtId/reactions').post(addReaction);

// api/thoughts/:thoughtId/reactions/reactionId
// removes a reaction from thought by id
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

// export router
module.exports = router;