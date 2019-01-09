const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const server = express();

const postdb = require("../data/helpers/postDb.js");
const userdb = require("../data/helpers/userDb.js");

//Middleware
function blogUpperCase(req, res, next) {
  const blog = req.body.name.toUpperCase();

  next();
}

server.use(morgan("short"));
server.use(helmet());
server.use(express.json());
server.use(cors());

// Users Routes
server.get("/api/userId", (req, res) => {
  //const user = req.params;

  userdb
    .get()
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: "The user could not be found " });
      }
    })
    .catch(err => {
      res.json(err);
    });
});
server.get("/:id", (req, res) => {
  const user = req.params.id;

  userdb
    .get(user)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "The user could not be found " });
      }
    })
    .catch(err => {
      res.json(err);
    });
});

server.post("/user", (req, res) => {
  const user = req.body;

  if (user) {
    userdb
      .insert(user)
      .then(response => {
        res.status(201).json(response);
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: "There was an error while saving name, Try Again" })
      );
  } else {
    res.status(400).json({ errorMessage: "Please provide a name" });
  }
});

server.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  if (name) {
    userdb
      .update(id, { name })
      .then(result => {
        res.status(200).json(result);
        //if (result) {
        // res.status(200);
        //} else {
        //  res.status(404).json({ message: "User does not exist" });
        //}
      })
      .catch(err =>
        res.status(500).json({ error: "User could not be modified" })
      );
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide ID and Name for user" });
  }
});

server.delete("/api/user/:id", (req, res) => {
  const id = req.params.id;

  userdb
    .remove(id)
    .then(count => {
      if (count !== 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "User specified does not exist" });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "User could not be removed, Try Again Later" })
    );
});

// Post Routes
module.exports = server;
