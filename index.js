const express = require("express");
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes.js')
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: false}))

userRoutes(app)

app.get('/', (req, res) => res.send('Rota/'))

app.listen (PORT, ()=> console.log("servidor rodando"))
