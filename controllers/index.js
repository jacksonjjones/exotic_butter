// Importing the Express Router module
const router = require('express').Router();

// Importing API routes and homeRoutes
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes'); 

// Using middleware to specify routes
router.use('/', homeRoutes); // Using homeRoutes for main routes
router.use('/api', apiRoutes); // Using apiRoutes for API endpoints

// Exporting the router for use in other modules
module.exports = router;

