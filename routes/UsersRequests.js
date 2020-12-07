const users=require('../controller/users.js')
const express=require('express');
const bodyParser= require('body-parser');
const multer = require('multer');

var urlEncodedParser= bodyParser.urlencoded({extended : false})
const router=express.Router();

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'public/img');
    },
    filename: (req, file, callBack) => {
        callBack(null, `RIMG_${file.originalname}`)
    }
  });
var upload = multer({ storage: storage })


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
        res.redirect('/postComplaint');
    }).catch((error)=>{
        console.log('error: '+error);
        res.redirect('/home');
    })
});

router.get('/postComplaint', (req, res)=>{
    console.log('showing post complaint view');
    res.render('users/postComplaint',{userData: {userId: 'snehalwagh2121@gmail.com', district: 'ahmednagar'}});
});
router.post('/postComplaint',upload.single('image'), urlEncodedParser, (req, res)=>{
    if(req.file){
        console.log(req.file);
    }
    console.log(req.body);

    // const addComplaint= `insert into complaint(uid, complaint, image, district) values(,'${req.body.grievanceDtl}','${req.file.filename}','${req.body.district}')`;
    res.render('users/postComplaint',{userData: {userId: 'snehalwagh2121@gmail.com', district: 'ahmednagar'}});
});
module.exports=router;