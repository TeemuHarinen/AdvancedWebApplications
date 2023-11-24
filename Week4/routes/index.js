var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/recipe/:id', function(req, res, next) {
  const recipe = {
    name: req.params.id,
    instructions: ['Test 1', 'Test 2', 'Test 3'],
    ingredients: ['Water', 'Meat', 'Vegetables']
  }
  res.json(recipe)
})

router.post('/recipe/', function(req, res, next) {
  res.json(req.body)
})

router.post('/images', function(req, res, next) {
  res.send('Hi')
})

module.exports = router;
