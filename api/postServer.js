console.log("postServer");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const postServer = express();

const postdb = require("../data/helpers/postDb.js");

postServer.use(morgan("short"));
postServer.use(helmet());
postServer.use(express.json());
postServer.use(cors());

// Post Routes
postServer.get("/api/posts", (req, res) => {
  const post = req.params.posts;
  postdb
    .get()
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "The post could not be retrieved." });
      }
    })
    .catch(err => {
      res.json(err);
    });
});

postServer.get("/api/posts/:postId", (req, res) => {
  const id = req.params.postId;
  postdb
    .get(id)
    .then(ids => {
      res.status(200).json(ids);
    })
    .catch(err => {
      res.json({
        errorMsg: "Post for specified could not be found",
        error: err
      });
    });
});

postServer.post("/api/posts", (req, res) => {
  const { userId, text } = req.body;

  if (userId && text) {
    postdb
      .insert({ userId, text })
      .then(id => {
        const postId = id.id;
      })
      .catch(err =>
        res.status(500).json({
          message: "Post could not be added",
          error: err
        })
      );
  } else {
    res.status(404).json({
      errorMessage: "Please provide user ID and text before continuing"
    });
  }
});

postServer.put("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  const { userId, text } = req.body;

  if (userId && text) {
    postdb
      .update(id, { userId, text })
      .then(post => {
        if (post) {
          res.status(200);
        } else {
          res.status(404).json({
            message: "Post with the specified user ID does not exist"
          });
        }
      })
      .catch(err =>
        res.status(500).json({ error: "The users post could not be modified" })
      );
  } else {
    res.status(400).json({
      errorMessage: "Please provide user Id and textx before continuing"
    });
  }
});

postServer.delete("/api/posts/:id", (req, res) => {
  const id = req.params.id;

  postdb
    .remove(id)
    .then(result => {
      if (result !== 0) {
        res.status(200).json(result);
      } else {
        res
          .status(404)
          .json({ error: "Post with specified ID could not be found" });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "The post could not be removed", error: err })
    );
});

module.exports = postServer;
