var express = require('express');
var router = express.Router();
var moment = require('moment');
var crypto = require("crypto");
var user_db = require('../../cloudantConnect');

router.get("/", function (req, res, next) {
  const message = "This message is from express.";
  res.render("f/f-input", { message: message });
});

module.exports = router;
