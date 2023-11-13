var express = require('express');
var router = express.Router();

let users = []
/* GET home page. */
router.post('/', function(req, res, next) {
  const { name, task } = req.body
  const existingUser = users.find(user => user.name === name)
  console.log(existingUser)
  if (existingUser) {
    existingUser.todos.push(task);
    res.send('Todo added');
  } else {
    // Create a new user
    const newUser = { name, todos: [task] };
    users.push(newUser);
    res.send('User added');
  }
  console.log(users)
})


module.exports = router;