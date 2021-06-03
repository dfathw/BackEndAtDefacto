const express = require('express');
const router = express.Router();
const Authentication = require('../middlewares/token-validation')
const UserService = require('../services/user.service');
const { getAllUser, getUserById, createUser, deleteUserById } = require('../controller/user.controller');
const userService = new UserService();

// router.use(Authentication);
router.get('/all', (req, res, next) => getAllUser(req, res, userService));
router.get('/:id', (req, res, next) => getUserById(req, res, userService));
router.post('/', (req, res, next) => createUser(req, res, userService));
router.delete('/:id', (req, res, next) => deleteUserById(req, res, userService));
// router.put('/', (req, res, next) => updateAdmin(req, res, attendService));

module.exports = router;