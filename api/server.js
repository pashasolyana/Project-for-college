const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const todoRouter = require('./Router/Router')

app.use(cookieParser());
app.use(bodyParser.json({extended : true}))
app.use(cors({
    credentials: true,
    origin : 'http://localhost:3000', 
}))

app.get('/user',todoRouter) 
app.post('/reg',todoRouter)
app.post('/login',todoRouter)
app.get('/todos',todoRouter)
app.put('/todos',todoRouter)
app.post('/todos',todoRouter)

app.post('/logout',(req,res) => {
    res.cookie('token', '').send();
})

app.listen(5000);