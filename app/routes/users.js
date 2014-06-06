var express = require('express');
var router = express.Router();

/* Users Permission:
    Guest: 0,
    Member: 1,
    Moderator: 2,
    Admin: 3
*/

/* GET users listing. */
router.get('/', ensureAuthenticatedAdmin, function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
    res.render('userlist', {
      "user": req.user,
      "userlist" : docs
    });
  });
});

/* POST users modifing. */
router.post('/modify', function(req, res){
  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var usersPermission = Number(req.body.usersPermission);
  var usersGoogleId = req.body.usersGoogleId;

  // Set our collection
  var collection = db.get('usercollection');

  // Submit to the DB
  collection.update({"google_id": usersGoogleId}, { $set: {"permission": usersPermission} }, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    }
    else {
      // If it worked, set the header so the address bar doesn't still say /adduser
      res.location("/users");
      // And forward to success page
      res.redirect("/users");
    }
  });
});

// ----- Functions ----
function ensureAuthenticatedAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.permission === 3) { return next(); }
  res.redirect('/error');
}

module.exports = router;
