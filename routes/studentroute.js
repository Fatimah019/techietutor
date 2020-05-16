const express=require("express");
const router=express.Router();
const student=require('../controller');
const auth=require('../middleware/auth');

//register a student
router.post('/student/signup', student.registerStudent);

router.get('/user/student', auth.ifLoggedIn,  student.studentTest);

//login students
router.post('/student/login', student.loginStudent);//--done(general 6)

//get all student details
router.get('/students', auth.ifLoggedIn ,student.getStudent);


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
*/
module.exports=router;