const express = require("express");

const router = express.Router();

const postdb = require("../data/helpers/postDb.js");

// middleware

// endpoints when url begins with /users
// Post Routes
router.get("/", (req, res) => {
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

router.get("/:postId", (req, res) => {
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

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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

module.exports = router;
