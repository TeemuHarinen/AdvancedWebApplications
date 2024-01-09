require('dotenv').config()
var express = require('express')
var router = express.Router()
const bcrypt = require("bcryptjs")
const {body, validationResult} = require('express-validator')
const User = require("../models/Users")
const Todo = require("../models/Todo")
const jwt = require("jsonwebtoken")
const validateToken = require("../auth/validateToken")

router.get('/', function(req, res, next) {
  res.send('respond with a resource')
});

router.post("/api/user/register", 
  body("email").isLength({min: 3}).trim().escape().isEmail().normalizeEmail(),
  body("password").isLength({min: 8}).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()-_+={}[\]|;:"<>,./?])/),
  (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
    }
    User.findOne({email: req.body.email}, (err, user) => {
      if(err) throw err
      if(user) {
        return res.status(403).json({email: "Email already exists"})
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => { 
            if(err) throw err
            User.create(
              {
                email: req.body.email,
                password: hash
              },
              (err, ok) => {
                if(err) throw err
                return res.redirect("/")
              }
              )
          })
        })
      }
    })
})

router.post('/api/user/login',
  body("email").trim().escape(),
  body("password"),
  (req, res, next) => {
    const user = User.findOne({email: req.body.email}, (err, user) => {
      if(err) throw err;
      if(!user) {
        return res.status(403).json({message: "Login failed"})
      } else {
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
          if(err) throw err;
          if(isMatch) {
            const jwtPayload = {
              id: user._id,
              email: user.email
            }
            jwt.sign(
              jwtPayload,
              process.env.SECRET,
              {
                expiresIn: 180
              },
              (err,token) => {
                res.json({success: true, token})
              }
            )
          }
        })
      }
    })
});

router.post('/api/todos', validateToken, async (req, res, next) => {
  try {
    const useerii = req.user.id
    console.log(useerii)
    const todo = req.body.items;
    console.log(todo)
    const todoFound = await Todo.findOne({user:req.user.id})
    if(todoFound) {
      for(let i=0; i<req.body.items.length;i++) {
        todoFound.items.push(req.body.items[i])
      }
      await todoFound.save()
    } else {
      await Todo.create({
        user: req.user.id,
        items: req.body.items
      })
    }
    return res.status(200).send('ok')
  } catch {
    console.error("Error");
    return res.status(500).json({ error: 'Internal Server Error' })
  }
})

router.get('/api/private', validateToken, (req, res, next) => {
  res.json({ success: true, email: req.user.email })
})

module.exports = router
