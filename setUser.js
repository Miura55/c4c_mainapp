var user_db = require('./cloudantConnect');

module.exports = function(req, res, next) {
  var userId = req.session.user_id;
  if (userId) {
    var query = {
      "selector": {
        "_id": userId,
      },
      "fields": ["_id","user_name"]
    }
    user_db.find(query, function(err, result) {
      if (!err) {
        res.locals.user = result.docs.length? result.docs[0]: false;
      }
    });
  }
  next();
};
