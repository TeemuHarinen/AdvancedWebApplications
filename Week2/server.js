const express = require('express')
const app = express()
const path = require('path')
const port = 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, '/')))
const wordList = []

app.get('/', (req, res) => {
  res.sendFile('/index.html')
})

app.post('/list', (req, res) => {
  const text = req.body.text;
  wordList.push(text);
  console.log(wordList)
  const obj = {
    list: wordList
  }
  res.json(obj)
});

app.get('/hello', (req, res) => {
  const obj = {msg: "Hello world!"}
  res.send(obj)
  res.end()
})

app.get('/echo/:id', (req, res) => {
  const echo = {id: req.params.id}
  res.send(echo)
  res.end()
})

app.post('/sum', (req, res) => {
  const numbers = req.body.numbers
  let sum = 0

  for(let i = 0; i < numbers.length; i++) {
    sum += numbers[i]
  }
  res.send( {"sum": sum} )
  res.end()
})


app.listen(port, () => console.log(`Server running on port ${port}!`))