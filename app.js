var express = require('express');
var createError = require('http-errors');
var bodyParser = require('body-parser');
var path = require('path');
var moment = require('moment')
var cookieParser = require('cookie-parser');
var engine = require('ejs-locals');
var logger = require('morgan');
var session = require('express-session');
var user_db = require('./cloudantConnect');
var crypto = require("crypto");

//ルーターの定義
var c_register = require('./routes/cordinator/c-register');
var c_login = require('./routes/cordinator/c-login');
var c_dashboard = require('./routes/cordinator/c-dashboard');
var f_register = require('./routes/fieldworker/f-register');
var f_login = require('./routes/fieldworker/f-login');
var v_register = require('./routes/volunteer/v-register');
var v_login = require('./routes/volunteer/v-login');

var app = express();
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// セッションの定義
var setUser = require('./setUser');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

// ルーティングの設定
app.use('/c/c-register', c_register);
app.use('/c/c-login', c_login);
app.use('/c/c-dashboard', c_dashboard);
app.use('/f/f-register', f_register);
app.use('/f/f-login', f_login);
app.use('/v/v-register', v_register);
app.use('/v/v-login', v_login);

var server = app.listen(3000, function () {
  console.log("Node.js is listening to PORT:" + server.address().port);
});

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

app.get("/c/c-completed-task-list", function (req, res, next) {
  const message = "This message is from express.";
  res.render("c/c-completed-task-list", { message: message });
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
