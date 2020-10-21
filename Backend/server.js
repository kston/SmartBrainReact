const express = require('express');
const bodyparser = require('body-parser');
const app = express();

var cors = require('cors')
app.use(cors());


const register = require('./src/register');



app.use(bodyparser.json());


app.get('/', (req,res) => {

res.send('hello')
})



app.post('/register', (req, res) => {

register.save(req.body).then(data => {
  res.json(data);

} ).catch(err => res.status(400).json("Not possible to save"))
  
})

app.listen('4000', () => {
  console.log("Server is working!")
});