const mongoose = require('mongoose');
const User = require('../model/User');
const Todo = require('../model/Todo')
const bcrypt = require('bcrypt');
const secret = 'amogus';
const jwt = require('jsonwebtoken');

try{
    mongoose.connect('mongodb://localhost:27017/ToDo',
    {
        useNewUrlParser : true,
        useUnifiedTopology : true
    } 
)}catch(error){
    console.log(error)
}

const db = mongoose.connection;
db.on('error', console.log)



class TodoControoler {

    async getUser(req, res) {
        try{
            const payload =  jwt.verify(req.cookies.token, secret);
            if(!payload){
                res.status(400).json({ message: "payload is empty" });
                throw new Error("payload is empty");
            }
            if(!userInfo) {
                res.status(400).json({ message: "userInfo is empty" });
                throw new Error("userInfo is empty");
            }
            User.findById(payload.id)
              .then(userInfo =>{
                  res.json({id: userInfo._id,email:userInfo.email});
              });

        }catch(error) {
            return res.status(400).send({ error: error, message: error.message });
        }
    }

    async regUser(req, res) {
        try{
            if (!req.body.email) {
                res.status(400).json({ message: "email is empty" });
                throw new Error("email is empty");
              }
            if (!req.body.password) {
                res.status(400).json({ message: "password is empty" });
                throw new Error("password is empty");
              }
            const {email,password} = req.body;
            const hashPass =  bcrypt.hashSync(password, 10)
            const user = new User({password : hashPass, email});
            user.save().then(userInfo =>{
            jwt.sign({id: userInfo._id, email: userInfo.email}, secret, (err, token) =>{
                if (err) {
                    console.log(error);
                    res.sendStatus(500);
                }else{
                    res.cookie('token', token).json({id: userInfo._id, email: userInfo.email})
                }
        });
    });
        }catch(error) {
            return res.status(400).send({ error: error, message: error.message });
        }
    }

    async logUser(req,res) {
        try{
            if (!req.body.email) {
                res.status(400).json({ message: "email is empty" });
                throw new Error("email is empty");
              }
            if (!req.body.password) {
                res.status(400).json({ message: "password is empty" });
                throw new Error("password is empty");
              }
            const {email,password} = req.body;
            User.findOne({email}).then(userInfo =>{
               const unHashPass =  bcrypt.compareSync(password, userInfo.password);
               if(unHashPass){
                    jwt.sign({id: userInfo._id, email}, secret, (err, token) => {
                        if (err) {
                            console.log(error);
                            res.sendStatus(500);
                        }else{
                            res.cookie('token', token).json({id: userInfo._id, email: userInfo.email})
                        }
                    })
               } else{
                   res.sendStatus(401);
               }
            })
        }catch(error){
            return res.status(400).send({ error: error, message: error.message });
        }
    }

    async getTodos(req, res) {
        try{
            const payload =  jwt.verify(req.cookies.token, secret);
            if(!payload){
                res.status(400).json({ message: "payload is empty" });
                throw new Error("payload is empty");
            }
            Todo.where({user: new mongoose.Types.ObjectId(payload.id)})
                .find((err, todos) => {
            res.json(todos)
        })
        }catch(error){
            return res.status(400).send({ error: error, message: error.message });
        }
    }

    async putTodos(req, res) {
        try{
            if(!req.body.text){
                res.status(400).json({ message: "text is empty" });
                throw new Error("text is empty");
            }
            const payload =  jwt.verify(req.cookies.token, secret);
            if(!payload){
                res.status(400).json({ message: "payload is empty" });
                throw new Error("payload is empty");
            }
            const todo = new Todo({
                text : req.body.text,
                done: false,
                user: new mongoose.Types.ObjectId(payload.id),
            });
            todo.save().then(todo => {
            res.json(todo)
        })
        }catch(error){
            return res.status(400).send({ error: error, message: error.message });
        }
    }

    async deleteTodos(req, res) {
        try{
            const payload =  jwt.verify(req.cookies.token, secret);
            if(!payload){
                res.status(400).json({ message: "payload is empty" });
                throw new Error("payload is empty");
            }
            Todo.deleteOne({
                _id : new mongoose.Types.ObjectId(req.body.id), 
                user: new mongoose.Types.ObjectId(payload.id)
            }).then(() => {
        res.sendStatus(200)
    })
        }catch(error){
            return res.status(400).send({ error: error, message: error.message });
        }
    }


}

module.exports = new TodoControoler()






