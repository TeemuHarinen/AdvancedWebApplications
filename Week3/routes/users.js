var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/:id', function(req, res, next) {
  const { id } = req.params
  // Finds the user based on id
  console.log("Sucess")
  console.log(users)
  const user = users.find(user => user.name.toLowerCase() === id.toLowerCase())

  if (user) {
    res.json(user)
  } else {
    res.status(404).send('User not found')
  }
});

module.exports = router;
