require('../users/model');
const express = require("express");
const router = express.Router();
const controller = require('./controller');
// Create a new Note
router.post('/signup', controller.create);

//login route
router.post('/login', controller.login);

module.exports = router;