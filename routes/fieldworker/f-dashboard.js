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
        "type": "fieldworkerinfo",
        "user_id": user_id,
      }
    };
    user_db.find(query, function(err, result) {
      if (err) {
        throw err;
      }
      console.log(result.docs);
      res.render("f/f-dashboard", {
        user_info: result.docs[0],
      });
    });
  }else {
    res.redirect('/f/f-login');
  }
});

module.exports = router;
