const users=require('../controller/users.js')
const express=require('express');
const bodyParser= require('body-parser');
const multer = require('multer');
const session=require('express-session');

var urlEncodedParser= bodyParser.urlencoded({extended : false})
const router=express.Router();

router.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'public/img');
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
  });
var upload = multer({ storage: storage })


router.post('/login',urlEncodedParser,(req, res)=>{
    console.log('post user login call made from UserRequire.js');
    console.log(req.body);
    users.authenticate(req.body)
    .then((result)=>{
        console.log('success', result.user);
        req.session.user=result.user;
        res.redirect('postComplaint');
    }).catch((error)=>{
        console.log('error: '+error.error);
        req.session.user=null;
        res.redirect('/home');
    });
});
router.post('/signUp',urlEncodedParser, (req, res)=>{
    users.createUser(req.body)
    .then((result)=>{
        console.log('success', result);
        req.session.user=result.user;
        res.redirect('/postComplaint');
    }).catch((error)=>{
        console.log('error: '+error);
        res.redirect('/home');
    })
});

router.get('/postComplaint', (req, res)=>{
    console.log('showing post complaint view');
    if(req.session.user!=null){
        res.render('users/postComplaint',{userData: req.session.user});
    }else{
        res.redirect('/home');
    }
});
router.post('/postComplaint',upload.single('image'), urlEncodedParser, (req, res)=>{
    console.log('comaplint: ',req.body);
    users.addComplaint(req.body,req.file.filename, req.session.user.uid)
    .then((result)=>{
        console.log(result);
        res.redirect('/home');
    }).catch((error)=>{
        console.log('error: '+error);
        res.redirect('/home');
    });
});
module.exports=router;