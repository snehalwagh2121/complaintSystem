const express=require('express');

const router=express.Router();

router.get('/',(req, res)=>{
    console.log('get posts call made from post.js');
    
})

module.exports=router;