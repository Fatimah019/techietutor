const express=require("express");
const router=express.Router();
const midWare=require('../middleware/auth');
const auth=require('../controller/auth');

//router.get('/student/register', (req, res, next)=>{
  //  res.render('signup', null);
//});

//router.get('/student/login', (req, res, next)=>{
  //  res.render('login', null);
//});


//get all student details
router.get('/students', auth.getStudent);

router.get('/me', midWare, auth.getStudent);
/*
Api test on postman
*/
//register an admin
router.post('/student/register', auth.registerStudent);
//login user
router.post('/student/login', auth.loginStudent);

/*

    const body=req.body;

    res.json({
        confirmation:"succesfully registered as a student",
        data:body
    })
});
*/
module.exports=router;