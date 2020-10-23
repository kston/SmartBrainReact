const express = require('express');
const bodyparser = require('body-parser');
const app = express();

var cors = require('cors')
app.use(cors());


const register = require('./src/register');
const signin = require('./src/signin');



app.use(bodyparser.json());


app.get('/', (req,res) => {

res.send('hello')
})



app.post('/register', (req, res) => {

register.save(req.body).then(data => {
  res.json(data);

} ).catch(err => res.status(400).json("Not possible to save"))
  
})

app.post('/signin', (req,res) => {

  signin.login(req.body).then(data => res.status(200).json(data)).catch(err => {
    res.json(err);
  })

  
})

app.listen('4000', () => {
  console.log("Server is working!")
});