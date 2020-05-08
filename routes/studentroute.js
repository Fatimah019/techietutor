const express=require("express");
const router=express.Router();
const midWare=require('../middleware/auth');
const auth=require('../controller/auth');

/*router.get('/signup/student', (req, res, next)=>{
    res.render('studentsignup', null);
}).post('/signup/student', auth.registerStudent);

//students dashboard
router.get('/students-dashboard', (req, res, next)=>{
    res.render('studentdashboard', null);
});
router.get('/login/student', (req, res, next)=>{
    res.render('studentslogin', null);
}).post('/login/student', auth.loginStudent);


//get all student details
router.get('/students', auth.getStudent);
*/
//router.get('/me', midWare, auth.getStudent);
/*
Api test on postman
*/
//register an admin
router.post('/signup/student', auth.registerStudent);
//login user
router.post('/student/login', auth.loginStudent);


module.exports=router;
/*


    const body=req.body;

    res.json({
        confirmation:"succesfully registered as a student",
        data:body
    })
});
*/
