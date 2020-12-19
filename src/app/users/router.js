require('./model');
const express = require("express");
const router = express.Router();
const controller = require('./controller');

// Retrieve all controller
router.get('/', controller.findAll);

//find user details
router.get('/:id', controller.findUserData);

// Update a Note with noteId
router.put('/:id', controller.update);

// Update a Note with noteId
router.put('/activeUsers/:id', controller.activeUsers)

// Delete a Note with noteId
router.delete('/:id', controller.delete);

module.exports = router;