// Call router and api folder
const router = require('express').Router();
const apiRoutes = require('./api');

// use/connect to api folder
router.use('/api', apiRoutes);

// default if incorrect route is entered
router.use((req, res) => res.send('Wrong route!'));

// Export Router
module.exports = router;