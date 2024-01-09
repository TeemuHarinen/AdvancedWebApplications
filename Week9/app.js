require('dotenv').config()
var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var mongoose = require("mongoose")
mongoose.set('strictQuery', false)

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

var app = express();

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')


app.get('/login.html', (req, res) => {
  res.render('login')
});

app.get('/register.html', (req, res) => {
  res.render('register')
});

app.get('/index.html', (req, res) => {
  res.render('index')
});

const mongoDB = 'mongodb://127.0.0.1:27017/testdb'
mongoose.connect(mongoDB)
mongoose.Promise = Promise
const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error"))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/', usersRouter)

app.use(function(req, res, next) {
  next(createError(404));
})

app.use(function(err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app;
