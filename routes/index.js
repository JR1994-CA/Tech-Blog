const router = require('express').Router();

// API routes folder
const apiRoutes = require('./api');
// Homepage routes
const homeRoutes = require('./home-routes');
// Dashboard Routes
const dashboardRoutes = require('./dashboard-routes');

router.use('/', homeRoutes);

router.use('/api', apiRoutes);

router.use('/dashboard', dashboardRoutes);


router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;