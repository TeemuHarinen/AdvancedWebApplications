var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/api/book/" , function(req, res, next) {
  console.log(req.body)
  res.json(req.body)
})

module.exports = router;
