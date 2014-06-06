var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res) {
  res.render('error', { 
    "user": req.user,
    message: "Not found or Don't have the Permission",
  });
});



module.exports = router;
