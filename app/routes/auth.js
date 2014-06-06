var express = require('express');
var router = express.Router();
var passport = require('passport');
var util = require('util');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// API Access link for creating client ID and secret:
// https://code.google.com/apis/console/
var GOOGLE_CLIENT_ID = "936977049172-oe5hrgohmvqd9p76obtq30orhqnd0m61.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET = "O6ieDtCflAIV9rUfIuFfBtno";

// Passport && Google stuff begin
// ------------------------------
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
router.use(passport.initialize());
router.use(passport.session());

router.get('/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
                                            'https://www.googleapis.com/auth/userinfo.email'] }),
  function(req, res){
    // The request will be redirected to Google for authentication, so this
    // function will not be called.
  });

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Define User permission. If new, add to DB with permission 0.
    defineUserPermission(req, res);

    res.redirect('/profile');
});
// Passport && Google stuff END
// ----------------------------

/* GET home page. */
router.get('/', function(req, res) {
  res.render('authIndex', { title: 'Express auth', "user": req.user });
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// ----- Functions ----

function defineUserPermission(req, res) {
  var db = req.db;
  // Set our collection
  var collection = db.get('usercollection');

  // Submit to the DB
  collection.find({"google_id": req.user.id}, {}, function(e, doc){
    if (typeof doc !== 'undefined' && doc.length > 0) {
      req.user.permission = doc[0].permission;
    } else {
      req.user.permission = 0; // User permission by default is 0 (guest)
      // Submit to the DB
      collection.insert({
          "google_id" : req.user.id,
          "permission" : 0, // User permission by default is 0 (guest)
          "email" : req.user.emails[0].value,
          "name" : req.user.displayName
      }, function (err, doc) {
          if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
          }
          else {
            console.log("Why would you do that?!?");
          }
      }); 
    }
  });  
}

module.exports = router;
