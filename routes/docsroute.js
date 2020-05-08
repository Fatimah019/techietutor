const express=require("express");
const router=express.Router();

//get home page and display
router.get('/docs', (req, res, next)=>{
    res.render('doc', null);
});

module.exports=router;
