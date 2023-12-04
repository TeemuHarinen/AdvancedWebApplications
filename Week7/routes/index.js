var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const {body, validationResult} = require('express-validator');
const session = require("express-session")

const users = []
let todoLists = []
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});

router.post('/api/user/register',
  body("username").isLength({ min: 3}).trim().escape(),
  body("password").isLength({ min: 3}),
  (req, res, next) => {
    if (req.session.user) {
      return res.redirect("/");
    }

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
    }

    const checkUsers = users.filter(user => user.username === req.body.username) // Checks whether user already exists in list
    if (checkUsers.length === 0) {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err

            const hashedUser = {
              id: Math.floor(Math.random() * 1000000),
              username: req.body.username,
              password: hash
            }
            users.push(hashedUser)
            return res.status(200).send(hashedUser)
          })
        })
      } else {
      return res.status(400).json({username: "Username already is in use."})
      }
    })

router.get('/api/user/list', (req, res) => {
  res.send(users)
})

router.post('/api/user/login', (req, res) => {
  if (req.session.user) {
    return res.redirect("/");
  }

  const { username, password } = req.body;
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) {
      throw err;
    }

    if (isMatch) {
      req.session.user = user;
      return res.status(200).send();
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  });
})

router.get("/api/secret", (req, res) => {
  if (req.session.user) {
    res.status(200).send()
  } else {
    res.status(401).json({ message: "Unauthorized" })
  }
})

router.post("/api/todos", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  let todoList = todoLists.find(list => list.id === req.session.user.id);
  if (!todoList) {
    todoList = { id: req.session.user.id, todos: [] };
    todoLists.push(todoList);
  }

  todoList.todos.push(req.body.todo);

  res.json(todoList);
});

router.get("/api/todos/list", (req, res) => {
  res.json(todoLists);
});

module.exports = router;
