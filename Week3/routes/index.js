var express = require('express');
var router = express.Router();

let users = []

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {todos: 'My todos' , title:'Taskapp'});
});


/* GET home page. */
router.post('/todo', function(req, res, next) {
  const { name, task } = req.body
  const existingUser = users.find(user => user.name === name)
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

router.get('/user/:id', function(req, res, next) {
  const { id } = req.params
  // Finds the user based on id
  const user = users.find(user => user.name.toLowerCase() === id.toLowerCase());
  
  if (user) {
    res.json(user)
  } else {
    res.status(404).json({ error: 'User not found' })
  }
});

router.delete('/user/:id', function(req, res, next) {
  const { id } = req.params
  const userToDelete = users.find(user => user.name.toLowerCase() === id.toLowerCase());
  
  if (userToDelete) {
    users = users.filter(user => user !== userToDelete)
    res.json({ users: users, message: "User deleted"})
  } else {
    res.status(404).json({ error: 'User not found '})
  }
})

module.exports = router;
