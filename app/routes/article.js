var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/achieveMe', function(req, res) {
  res.render('articleAchieveMe', { "user": req.user });
});


module.exports = router;
