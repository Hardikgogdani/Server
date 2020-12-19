// require('dotenv').config();
const jwt = require("jsonwebtoken");

// const SECRET = process.env.SECRET_KEY;
const SECRET = "supersecret";

module.exports = function (req, res, next) {
    const token = req.body.token || req.query.token || req.headers["authorization"];

    if (token) {
        return jwt.verify(token, SECRET, function (err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: "Failed to authenticate token.",
                });
            }
            req.user = decoded;
            return next();
        });
    }
    return res.sendStatus(403);
};
