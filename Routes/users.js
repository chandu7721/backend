const express = require("express");
const Result = require("../Database");
//const Mapping = require("./Operations");
const Router = express.Router();

Router.post("/Insert", (req, res) => {
  let Details = req.body;
  console.log(Details);
  Result("users", "Insert", Details)
    .then((result) => {
      res.send(result);
      console.log(result);
    })
    .catch((err) => {
      res.send(err);
    });
});
Router.get("/Read:_ID", (req, res) => {
  const Details = req.params._ID;
  Result("users", "Read", Details)
    .then((result) => {
      res.send({ Message: result.Message, Result: result.rows });
      console.log(result);
    })
    .catch((err) => {
      res.send(err);
    });
});
// Login Validation
Router.post("/Login", (req, res) => {
  const { email, password } = req.body;

  Result("users", "Login", { email: email, password: password })
    .then((result) => {
      if (result.rows.length > 0) {
        res.send({ success: true, message: "Login successful" });
      } else {
        res.send({ success: false, message: "Invalid email or password" });
      }
    })
    .catch((err) => {
      res.send({ success: false, message: "An error occurred during login" });
    });
});

module.exports = Router;
