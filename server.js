const express= require('express');
require('dotenv').config();
const mysql= require('mysql');
const path= require('path');
const livereload = require("livereload");
const session=require('express-session');
const publicDirectory=path.join(__dirname,'public');

const server=express();

server.set('view engine', 'ejs');

//IMPORT ROUTES
const userRoute=require('./routes/UsersRequests.js');

//MIDDLEWARE
server.use('/user', userRoute);
server.use(session({
        secret: 'secret-key',
        resave: false,
        saveUninitialized: false
    }));
// server.use('/officer', officerRoute);
server.use(express.static(publicDirectory));

//DB CONNECTION
const db= mysql.createConnection({
    host: process.env.HOST_NAME,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASS,
    port:process.env.PORT
});
db.connect((err)=>{
    if(err)
        console.log('could not connect to DB bcoz of following error: '+err);
    else
        console.log('succefully connected to db');
})

server.get('/', (req, res)=>{
    res.redirect('user/home');
});

module.exports.db=db;
server.listen('3000');