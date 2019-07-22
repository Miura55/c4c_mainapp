var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var moment = require('moment')
var cookieParser = require('cookie-parser');
var engine = require('ejs-locals');
var logger = require('morgan');
var session = require('express-session');
var user_db = require('./cloudantConnect');
var crypto = require("crypto");

// セッションの定義
var setUser = require('./setUser');

var app = express();
app.engine('ejs', engine);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

var server = app.listen(3000, function () {
  console.log("Node.js is listening to PORT:" + server.address().port);
});
app.set('view engine', 'ejs');


//ルーティング

//debug
app.get("/debug", function (req, res, next) {
  const message = "This message is from express.";
  res.render("debug/debug", { message: message });
});

//コーディネータ
app.get("/c/c-ask-from-f", function (req, res, next) {
  const message = "This message is from express.";
  res.render("c/c-ask-from-f", { message: message });
});

app.get("/c/c-assign-v", function (req, res, next) {
  const message = "This message is from express.";
  res.render("c/c-assign-v", { message: message });
});

app.get("/c/c-register", function (req, res, next) {
  res.render("c/c-register", {
    title:"新規会員登録"
  });
});

app.post('/c/c-register', function(req, res, next) {
  var _id = "c-" + moment().unix().toString(10);
  var userName = req.body.user_name;
  var email = req.body.email;
  var password = req.body.password;
  var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');

  // パスワードを暗号化
  var cipher = crypto.createCipher('aes192', "passw0rd");
  cipher.update(password, 'utf8', 'hex');
  var cipheredText = cipher.final('hex');

  // 登録するためのquery
  var body = {
    "type": "cordinatorinfo",
    "user_id" : _id,
    "user_name": userName,
    "email": email,
    "password": cipheredText,
    "age": req.body.age,
    "live": req.body.live,
    "telephone": req.body.telephone,
    "belongs": req.body.belongs,
    "skill": req.body.skill,
    "created_at": createdAt,
  };

  // メールアドレスがあるかどうかを確認するためのquery
  var query = {
    "selector": {
      "email": email,
      "type": "cordinatorinfo",
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
      res.render('c/c-register', {
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
          res.redirect("/c/c-login");
      });
    }
  });
});

// ログイン画面
app.get("/c/c-login", function (req, res, next) {
  res.render("c/c-login", { title: "ログイン" });
});

app.post("/c/c-login", function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  // パスワードを暗号化
  var cipher = crypto.createCipher('aes192', "passw0rd");
  cipher.update(password, 'utf8', 'hex');
  var cipheredText = cipher.final('hex');

  var query = {
    "selector": {
      "type": "cordinatorinfo",
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
      res.render("c/c-dashboard", {
        user_name: req.session.user_name
      });
    }else{
      res.render('c/c-login', {
        title: 'ログイン',
        noUser: 'メールアドレスとパスワードが一致するユーザーはいません'
      });
    }
  });
});

app.get("/c/c-completed-task-list", function (req, res, next) {
  const message = "This message is from express.";
  res.render("c/c-completed-task-list", { message: message });
});

app.get("/c/c-dashboard", function (req, res, next) {
  res.render("c/c-dashboard", { title: "ダッシュボード" });
});

app.get("/c/c-edit-prof", function (req, res, next) {
  const message = "This message is from express.";
  res.render("c/c-edit-prof", { message: message });
});

app.get("/c/c-find-other-cordinators", function (req, res, next) {
  const message = "This message is from express.";
  res.render("c/c-find-other-cordinators", { message: message });
});

app.get("/c/c-find-task", function (req, res, next) {
  const message = "This message is from express.";
  res.render("c/c-find-task", { message: message });
});

app.get("/c/c-find-volunteers", function (req, res, next) {
  const message = "This message is from express.";
  res.render("c/c-find-volunteers", { message: message });
});

app.get("/c/c-hand-over-to-c", function (req, res, next) {
  const message = "This message is from express.";
  res.render("c/c-hand-over-to-c", { message: message });
});

app.get("/c/c-my-prof", function (req, res, next) {
  const message = "This message is from express.";
  res.render("c/c-my-prof", { message: message });
});

app.get("/c/c-public-info", function (req, res, next) {
  const message = "This message is from express.";
  res.render("c/c-public-info", { message: message });
});

app.get("/c/c-support-place-list", function (req, res, next) {
  const message = "This message is from express.";
  res.render("c/c-support-place-list", { message: message });
});

app.get("/c/c-task-detail", function (req, res, next) {
  const message = "This message is from express.";
  res.render("c/c-task-detail", { message: message });
});

app.get("/c/c-task-list", function (req, res, next) {
  const message = "This message is from express.";
  res.render("c/c-task-list", { message: message });
});

app.get("/c/c-top", function (req, res, next) {
  const message = "This message is from express.";
  res.render("c/c-top", { message: message });
});

//現場担当者
// ログイン画面
app.get("/f/f-login", function (req, res, next) {
  res.render("f/f-login", { title: "ログイン" });
});

app.post("/f/f-login", function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  // パスワードを暗号化
  var cipher = crypto.createCipher('aes192', "passw0rd");
  cipher.update(password, 'utf8', 'hex');
  var cipheredText = cipher.final('hex');

  var query = {
    "selector": {
      "type": "fieldworkerinfo",
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
      res.render("f/f-dashboard", {
        user_name: req.session.user_name
      });
    }else{
      res.render('f/f-login', {
        title: 'ログイン',
        noUser: 'メールアドレスとパスワードが一致するユーザーはいません'
      });
    }
  });
});

app.get("/f/f-register", function (req, res, next) {
  res.render("f/f-register", {
    title:"新規会員登録"
  });
});

app.post('/f/f-register', function(req, res, next) {
  var _id = "f-" + moment().unix().toString(10);
  var userName = req.body.user_name;
  var email = req.body.email;
  var password = req.body.password;
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
    "agreements": [req.body.agreement1, req.body.agreement2, req.body.agreement3],
    "created_at": createdAt,
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


app.get("/f/f-dashboard", function (req, res, next) {
  const message = "This message is from express.";
  res.render("f/f-dashboard", { message: message });
});

app.get("/f/f-edit-prof", function (req, res, next) {
  const message = "This message is from express.";
  res.render("f/f-edit-prof", { message: message });
});

app.get("/f/f-input", function (req, res, next) {
  const message = "This message is from express.";
  res.render("f/f-input", { message: message });
});

app.get("/f/f-invite-new-volunteer", function (req, res, next) {
  const message = "This message is from express.";
  res.render("f/f-invite-new-volunteer", { message: message });
});

app.get("/f/f-my-prof", function (req, res, next) {
  const message = "This message is from express.";
  res.render("f/f-my-prof", { message: message });
});

app.get("/f/f-public-info", function (req, res, next) {
  const message = "This message is from express.";
  res.render("f/f-public-info", { message: message });
});

app.get("/f/f-task-detail", function (req, res, next) {
  const message = "This message is from express.";
  res.render("f/f-task-detail", { message: message });
});

app.get("/f/f-task-list", function (req, res, next) {
  const message = "This message is from express.";
  res.render("f/f-task-list", { message: message });
});

app.get("/f/f-top", function (req, res, next) {
  const message = "This message is from express.";
  res.render("f/f-top", { message: message });
});

app.get("/f/f-volunteers-list", function (req, res, next) {
  const message = "This message is from express.";
  res.render("f/f-volunteers-list", { message: message });
});

//ボランティア

app.get("/v/v-register", function (req, res, next) {
  res.render("v/v-register", {
    title:"新規会員登録"
  });
});

app.post('/v/v-register', function(req, res, next) {
  var _id = "v-" + moment().unix().toString(10);
  var userName = req.body.user_name;
  var email = req.body.email;
  var password = req.body.password;
  var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');

  // パスワードを暗号化
  var cipher = crypto.createCipher('aes192', "passw0rd");
  cipher.update(password, 'utf8', 'hex');
  var cipheredText = cipher.final('hex');

  // 登録するためのquery
  var body = {
    "type": "volunteerinfo",
    "user_id" : _id,
    "user_name": userName,
    "email": email,
    "password": cipheredText,
    "age": req.body.age,
    "live": req.body.live,
    "telephone": req.body.telephone,
    "occupation": req.body.occupation,
    "skill": req.body.skill,
    "goto": req.body.goto,
    "arrivaldate": req.body.arrivaldate,
    "Twitter": req.body.Twitter,
    "insurance": req.body.insurance,
    "pr": req.body.pr,
    "car": req.body.car,
    "created_at": createdAt,
  };

  // メールアドレスがあるかどうかを確認するためのquery
  var query = {
    "selector": {
      "email": email,
      "type": "volunteerinfo",
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
      res.render('v/v-register', {
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
          res.redirect("/v/v-login");
      });
    }
  });
});

// ログイン画面
app.get("/v/v-login", function (req, res, next) {
  res.render("v/v-login", { title: "ログイン" });
});

app.post("/v/v-login", function(req, res, next) {
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

app.get("/v/v-ans", function (req, res, next) {
  const message = "This message is from express.";
  res.render("v/v-ans", { message: message });
});

app.get("/v/v-auth", function (req, res, next) {
  const message = "This message is from express.";
  res.render("v/v-auth", { message: message });
});

app.get("/v/v-completed-task-list", function (req, res, next) {
  const message = "This message is from express.";
  res.render("v/v-completed-task-list", { message: message });
});

app.get("/v/v-dashboard", function (req, res, next) {
  const message = "This message is from express.";
  res.render("v/v-dashboard", { message: message });
});

app.get("/v/v-edit-prof", function (req, res, next) {
  const message = "This message is from express.";
  res.render("v/v-edit-prof", { message: message });
});

app.get("/v/v-my-prof", function (req, res, next) {
  const message = "This message is from express.";
  res.render("v/v-my-prof", { message: message });
});

app.get("/v/v-public-info", function (req, res, next) {
  const message = "This message is from express.";
  res.render("v/v-public-info", { message: message });
});

app.get("/v/v-task-detail", function (req, res, next) {
  const message = "This message is from express.";
  res.render("v/v-task-detail", { message: message });
});

app.get("/v/v-top", function (req, res, next) {
  const message = "This message is from express.";
  res.render("v/v-top", { message: message });
});



//functions
