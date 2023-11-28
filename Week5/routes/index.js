var express = require('express');
const Recipe = require('../models/Recipe');
const Category = require('../models/Category');
const Image = require('../models/Image')
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
      console.log(recipes)
      return res.send(recipes[0])
    } else {
      return res.status(404).send(`Recipe ${recipeName} not found`)
    }
  })
})

router.post('/recipe/', function(req, res, next) {
  Recipe.findOne({ name: req.body.name }, (err, recipe) => {
    if(err) return next(err);
    if(!recipe) { // sends the recipe to mongodb if recipe doesn't exist there yet
      new Recipe({ 
        name: req.body.name,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients,
        categories: req.body.categories,
        images: req.body.images
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

router.post('/images', async (req, res) => {
  try {
    let images = [];
    if (req.files) {
      // checks if multiple files are submitted
      if(Array.isArray(req.files.images)) {
        // loops through the files, parsing relevant info and appending to array
        for (let i = 0; i < req.files.images.length; i++) {
          images.push({
            buffer: req.files.images[i].data,
            mimetype: req.files.images[i].mimetype,
            name: req.files.images[i].name,
            encoding: req.files.images[i].encoding,
            });
          }
    } else {
      console.log("Server data looks like this:", req.files.images)
      // handles single file submission
      images.push({
        buffer: req.files.images.data,
        mimetype: req.files.images.mimetype,
        name: req.files.images.name,
        encoding: req.files.images.encoding
      })
    }
      console.log("data sent to mongodb", images)
      // send data to mongodb
      const savedImages = await Image.create(images);
      res.status(200).json(savedImages);
    } else {
      res.status(400).json({ error: 'No files uploaded' });
    }
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/images/:imageId', (req, res, next) => {
  const imageToFind = req.params.imageId
  Image.find( { _id: imageToFind}, (err, images) => {
    if(err) return next(err)
    if(images.length > 0) {
      res.setHeader('Content-Type', 'image/*')
      res.setHeader('Content-Disposition', 'inline')
      console.log("What is being sent back to browser", images[0])
      return res.send(images[0])
    } else {
      return res.status(404).send(`Recipe ${imageToFind} not found`)
    }
  })
})

module.exports = router;
