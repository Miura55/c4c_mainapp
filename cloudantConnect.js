// Load the Cloudant library.
var Cloudant = require('@cloudant/cloudant');
var cred = require('./cloudant_credentials');

var me = cred.username; // Set this to your own account.
var password = cred.password;

// Initialize the library with my account.
var cloudant = Cloudant({ account: me, password: password });
var user_db = cloudant.use('volunteer_info');

module.exports = user_db;
