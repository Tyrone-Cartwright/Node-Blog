const express = require("express");
const configMiddleware = require("../config/middleware.js");

const apiRouter = require("../api/apiRouter.js");
const server = express();

configMiddleware(server);

// const userdb = require("../data/helpers/userDb.js");

//Middleware

// Users Routes
server.use("/api", apiRouter);

module.exports = server;
