var express = require('express');
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const Category = require('../models/Category');
var router = express.Router();

/* GET home page. */

router.get('/recipe', function(req, res, next) {
  Recipe.find({}, (err, recipes) => {
    console.log(recipes)
    if (err) return next(err)
    if(recipes) {
      return res.json(recipes)
    } else {
      return res.status(404).send("Not found")
    }
  })
})


router.get('/recipe/:food', function(req, res, next) {
  const recipeName = req.params.food

  Recipe.find( {name: new RegExp(recipeName, "i")}, (err, recipes) => {
    if(err) return next(err)
    if(recipes.length > 0) {
      return res.send(recipes)
    } else {
      return res.status(404).send(`Recipe ${recipeName} not found`)
    }
  })
})

router.post('/recipe/', function(req, res, next) {
  console.log(req.body)
  Recipe.findOne({ name: req.body.name }, (err, recipe) => {
    if(err) return next(err);
    if(!recipe) {
      new Recipe({ 
        name: req.body.name,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients
      }).save((err) => {
        if(err) return next(err);
        return res.send(req.body)
      })

    } else {
      return res.status(403).send("Recipe already exists")
    }
  })
})

router.get('/categories', function(req, res, next) {
  Category.find({}, (err, categories) => {
    return res.json(categories)
  })
})
router.post('/images', function(req, res, next) {
  res.send('Hi')
})

module.exports = router;
