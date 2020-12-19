require('dotenv').config();
const Users = require('../users/model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/database.config");

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //Encrypt password
    req.body.password = bcrypt.hashSync(req.body.password, 8);

    // Create a Note
    // Save Note in the database
    Users.create(req.body)
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
};

//login data
exports.login = (req, res) => {

    // const userVarify = jwt.verify(token, "mynameissagarvorasdfsjfjjfjsdfsdfsfjffsdfsdkfjf");
    Users.findOne({ email: req.body.email })
        .then(users => {
            const isMatch = bcrypt.compareSync(req.body.password, users.password);
            if (isMatch) {
                const token = jwt.sign({ email: req.body.email }, config.secret);
                res.status(200).send({ auth: true, token: token });
                console.log(token)
                return res.send(users);
            } else {
                return res.status(500).send({ message: "User Field Are Not Correct" });
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving login."
            });
        });
};

