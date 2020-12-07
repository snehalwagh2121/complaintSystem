const users=require('../controller/users.js')
const express=require('express');
const bodyParser= require('body-parser');

var urlEncodedParser= bodyParser.urlencoded({extended : false})
const router=express.Router();

router.post('/login',(req, res)=>{
    console.log('get user login call made from UserRequire.js');
    users.authenticate(req.body)
    .then((result)=>{
        console.log('success', result);
        res.render('postComplaint');
    }).catch((error)=>{
        console.log('error: '+error);
        res.redirect('/home');
    });
});
router.post('/signUp',urlEncodedParser, (req, res)=>{
    users.createUser(req.body)
    .then((result)=>{
        console.log('success', result);
        res.render('postComplaint');
    }).catch((error)=>{
        console.log('error: '+error);
        res.redirect('/home');
    })
});

// router.get('/postComplaint', (req, res)=>{
//     console.log('showing post complaint view');
//     res.redirect
// })

module.exports=router;