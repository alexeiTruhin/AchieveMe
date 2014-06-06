var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', ensureAuthenticated, function(req, res) {
  res.render('profile', { "user": req.user });
});

// ----- Functions ----
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/error');
}

module.exports = router;
