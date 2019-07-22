var express = require('express');
var router = express.Router();
var moment = require('moment');
var crypto = require("crypto");
var user_db = require('../../cloudantConnect');

router.get("/", function (req, res, next) {
  res.render("v/v-login", { title: "ログイン" });
});

router.post("/", function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  // パスワードを暗号化
  var cipher = crypto.createCipher('aes192', "passw0rd");
  cipher.update(password, 'utf8', 'hex');
  var cipheredText = cipher.final('hex');

  var query = {
    "selector": {
      "type": "volunteerinfo",
      "email": email,
      "password": cipheredText
    },
    "fields": ["_id","email", "password", "user_name"]
  };

  user_db.find(query, function(err, result) {
    if (err) {
      throw err;
    }
    var userId = result.docs.length? result.docs[0]._id: false;

    if (userId){
      req.session.user_id = userId;
      req.session.user_name = result.docs[0].user_name;
      res.render("v/v-dashboard", {
        user_name: req.session.user_name
      });
    }else{
      res.render('v/v-login', {
        title: 'ログイン',
        noUser: 'メールアドレスとパスワードが一致するユーザーはいません'
      });
    }
  });
});


module.exports = router;
