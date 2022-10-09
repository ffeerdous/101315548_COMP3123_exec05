const express = require('express');
const app = express();
const router = express.Router();
const fs = require("fs");

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  res.sendFile(__dirname + "/home.html");
});

/*
- Return all details from user.json file to client as JSON format
*/
const data = require('./user.json')
router.get('/profile', (req,res) => {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(data));
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login/:username/:password', (req,res) => {
  if(data['username'] != req.params.username){
    res.status(424).send({message: "User Name is invalid"})
  }
  else if(data['password'] != req.params.password){
    res.status(424).send({message: "Password is invalid"})
  }
  else{
    res.status(200).send({message: "User Is valid"})
  }
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req,res) => {
  var username = req.params.username;
  res.send(`<b>${username} successfully logout.</b>`)
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));