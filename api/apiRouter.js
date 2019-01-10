const express = require("express");

const postsRouter = require("../posts/postsRouter.js");
const usersRouter = require("../users/usersRouter.js");

const router = express.Router();

router.use("/users", usersRouter);
router.use("/posts", postsRouter);

module.exports = router;
