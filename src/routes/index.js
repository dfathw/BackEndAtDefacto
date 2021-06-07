const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const authRoute = require('./auth.route');
const contentRoute = require('./content.route')
const noRoute = require('./no.route');
const logRoute = require('./log.route');

router.use(logRoute);

router.use('/auth', authRoute);
router.use('/content', contentRoute)
router.use('/user', userRoutes);
router.use(noRoute);

module.exports = router;