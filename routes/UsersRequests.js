const users=require('../controller/users.js');
const officers=require('../controller/officers.js');
const express=require('express');
const bodyParser= require('body-parser');
const multer = require('multer');
const session=require('express-session');
const dbObj= require('../server.js');
const { resolve } = require('path');

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

let user=0;
let officer=0;

router.get('/userLogin' ,(req, res)=>{
    user=1;
    officer=0;
    console.log('user login');
    res.render('users/login');
});
router.get('/officerLogin',(req, res)=>{
    user=0;
    officer=1;
    console.log('officer login');
    res.render('users/login');
});
router.post('/login',urlEncodedParser,(req, res)=>{
    console.log('post user login call made from UserRequire.js');
    console.log(req.body);
    users.authenticate(req.body, user)
    .then((result)=>{
        console.log('success', result.user);
       if(user){
           req.session.officer=null;
            req.session.user=result.user;
            res.redirect('/home');
       }else{
        req.session.officer=result.user;
        req.session.user=null;
        res.redirect('trackGravience');
       }
    }).catch((error)=>{
        console.log('error occured : '+error.error);
        req.session.user=null;
        req.session.officer=null;
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
        console.log('please login first');
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





//OFFICER OPERATIONS


//GET TACKING COMPLAINTS FORA PARTICULAR USER
router.get('/trackGravience',(req, res)=>{
    let allComplaints;
    console.log('showing get track Grievance view of user: '+req.session.user);
    console.log('req.session.user: '+req.session.user);
    console.log('req.session.officer: '+req.session.officer);

    if(req.session.user!=null ){
        console.log('get users comaplaints');
        users.getAllComplaints(req.session.user.uid)
        .then(resolve=>{
            allComplaints=resolve;
            res.render('users/trackGravience',{userData: req.session.user, complaintData: allComplaints, officerData:""});
        }).catch(reject=>{
            res.redirect('/home');
        })
    }else if(req.session.officer!=null){
        console.log('get officers comaplaints');
        officers.getAllOfficerComplaints(req.session.officer.fid)
        .then(resolve=>{
            allComplaints=resolve;
            res.render('users/trackGravience',{userData: req.session.user, complaintData: "", officerData: resolve});
        }).catch(reject=>{
            res.redirect('/home');
        })
    }else{
        console.log('please login first');
        res.redirect('/home');
    }
});

//CHANGE STATUS OF THE COMPLAINT
router.post('/trackGravience',urlEncodedParser, (req, res)=>{
    console.log('post track gravience req.body: ',req.body);
    
    officers.changeStatus(req.body)
    .then(resolve=>{
        console.log('updated status succesfully');
        officers.getAllOfficerComplaints(req.session.officer.fid)
        .then(resolve=>{
            allComplaints=resolve;
            res.render('users/trackGravience',{userData: req.session.user, complaintData: "", officerData: resolve});
        }).catch(reject=>{
            res.redirect('/home');
        }) ;
    }).catch(reject=>{
        console.log('some error occured');
        res.redirect('/home');
    })
});


//GET OFFICERS CONTACT PAGE
router.get('/OfficersContact', (req, res)=>{
    console.log('showing Officers Contact page: ');
    officers.officersContact()
    .then(resolve=>{
        res.render('officers/contacts',{contacts: resolve});
    }).catch(reject=>{
        res.redirect('/home');
    })
   
});

router.get('/news',(req, res)=>{
    console.log('news page');
    res.render('users/news');
})
module.exports=router;