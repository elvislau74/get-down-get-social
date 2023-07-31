// Call router and other route files
const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

// use/connect to thought and user routes
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

// export router
module.exports = router;
