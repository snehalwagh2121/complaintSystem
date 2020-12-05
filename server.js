const express= require('express');
require('dotenv').config();
const mysql= require('mysql');
const path= require('path');
const livereload = require("livereload");

const publicDirectory=path.join(__dirname,'public');

const server=express();

server.set('view engine', 'ejs');

//IMPORT ROUTES
const postRoute=require('./routes/post.js');
//MIDDLEWARE
server.use('/posts', postRoute);
server.use(express.static(publicDirectory));

const userSchema=require('./models/userSchema.js');

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
    console.log('get call made');
    res.render('home');
})


server.listen('3000');