var express = require('express');
var router = express.Router();
var moment = require('moment');
var crypto = require("crypto");
var user_db = require('../../cloudantConnect');

router.get("/", function (req, res, next) {
  var user_id = req.session.user_id? req.session.user_id: false;
  if (user_id){
    var query = {
      "selector": {
        "type": "cordinatorinfo",
        "user_id": user_id,
      }
    };
    user_db.find(query, function(err, result) {
      if (err) {
        throw err;
      }
      console.log(result.docs);
      res.render("c/c-dashboard", {
        user_info: result.docs[0],
      });
    });
  }else {
    res.redirect('/c/c-login');
  }
});

router.post("/", function(req, res, next) {
  console.log(req.body);
  var query = {
      "selector": {
        "type": "cordinatorinfo",
        "user_id": req.session.user_id,
      }
    };
    user_db.find(query, function(err, result) {
      if (err) {
        throw err;
      }
      console.log(result);
      var write_data = result.docs[0];
      write_data.availabletowork = req.body.availabletowork;
      user_db.insert(write_data, write_data._id, (err, data) => {
        if (err) {
          throw err;
        } else {
          console.log(data);
        }
      });
    });
});

module.exports = router;
