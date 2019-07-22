var express = require('express');
var router = express.Router();
var moment = require('moment');
var crypto = require("crypto");
var user_db = require('../../cloudantConnect');

router.get("/", function (req, res, next) {
  res.render("f/f-register", {
    title:"新規会員登録"
  });
});

router.post('/', function(req, res, next) {
  var _id = "f-" + moment().unix().toString(10);
  var userName = req.body.user_name;
  var email = req.body.email;
  var password = req.body.password;
  var agreement1 = req.body.agreement1;
  var agreement2 = req.body.agreement2;
  var agreement3 = req.body.agreement3;
  var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');

  // パスワードを暗号化
  var cipher = crypto.createCipher('aes192', "passw0rd");
  cipher.update(password, 'utf8', 'hex');
  var cipheredText = cipher.final('hex');

  // 登録するためのquery
  var body = {
    "type": "fieldworkerinfo",
    "user_id" : _id,
    "user_name": userName,
    "email": email,
    "password": cipheredText,
    "age": req.body.age,
    "live": req.body.address,
    "telephone": req.body.telephone,
    "agreements": {
      "agreement1": [req.body.agreement1, req.body.agreement1_phone],
      "agreement2": [req.body.agreement2, req.body.agreement2_phone],
      "agreement3": [req.body.agreement3, req.body.agreement3_phone],
    },
    "created_at": createdAt
  };

  // メールアドレスがあるかどうかを確認するためのquery
  var query = {
    "selector": {
      "email": email,
      "type": "fieldworkerinfo",
    },
    "fields": ["_id","email"]
  };

  user_db.find(query, function(err, result) {
    if (err) {
      throw err;
    }
    console.log('Found %d documents', result.docs.length);
    console.log(result.docs);
    if (result.docs[0]){
      res.render('f/f-register', {
          title: '新規会員登録',
          emailExists: '既に登録されているメールアドレスです'
      });
    }else{
      user_db.insert(body, _id, (err, data) => {
        if (err) {
            console.log(err);
          } else {
            console.log(data); // { ok: true, id: _id, ...
          }
          res.redirect("/f/f-login");
      });
    }
  });
});

module.exports = router;
