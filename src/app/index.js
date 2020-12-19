const usersRouter = require("./users/router");
const authRouter = require("./auth/router");
const varifyToken = require("../midleware/validateToken");

module.exports = (app) => {
    app.use("/users",varifyToken, usersRouter);
    app.use("/auth", authRouter);
};