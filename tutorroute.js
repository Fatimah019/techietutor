const express=require("express");
const router=express.Router();
const auth=require('../controller/auth');
//const auth=require('../middleware/auth');

//router.get('/tutor/register', (req, res, next)=>{
  //  res.render('signup', null);
//});

//router.get('/tutor/login', (req, res, next)=>{
  //  res.render('login', null);
//});

//get all student details
router.get('/tutors', auth.getTutor)
/*
Api test on postman
*/
//register an admin
router.post('/tutor/register', auth.registerTutor);
//login user
router.post('/tutor/login', auth.loginTutor);


module.exports=router;




/*admin route* deleted/
/*
const express=require("express");
const router=express.Router();
const adminController=require('../controllers1/admin');
const auth=require('../middleware/auth');
//const validator=require('../validator');

//get home page and display
router.get('/online-tutoring-app:docs', (req, res, next)=>{
    res.render('home', null);
});
//register admin
//router.get('/admin/register', (req, res, next)=>{
  //  res.render('signup', null);
//});
//admin login
//router.get('/admin/login', (req, res, next)=>{
  //  adminController.registerAdmin
    //res.render('login', null);
//});
//admin dashboard
router.get('/dashboard', (req, res, next)=>{
    res.render('admindashboard', null);
});

//get admin by email
router.get('/users', adminController.getAdmin);

//register an admin
router.post('/register',  adminController.registerAdmin);
//login user
router.post('/login',  adminController.registerAdmin);

module.exports=router;

//get admin registration form and display on the browser
//router.get('/admin/register', adminController.adminSignUp);



/*
//create new admin 
router.post('/newAdmin', validator.createUsersValidator, adminController.createAdmin);

//router.get
router.post('/allAdmin', adminController.getAllAdmin);

router.post('/signup', (req, res)=>{
    const body=req.body;
    res.json({
        confirmation:"succesfully registered as an admin",
        data:body
    })
});



/*
const profiles={
    user1:{
        name:"myname",
        company:"facebook",
        language:["java", "ruby", "c++"]
    },
    user2:{
        name:"myname",
        company:"mcrosoft",
        language:["python", "chasrp"]
    },
    user3:{
        name:"myname",
        company:"google",
        language:["csharp", "go"]
    }
}


router.post('/addprofile', (req, res)=>{
    const body=req.body;
    const language=
    res.json({
        confirmation:"added successfully",
        data:body
    })
})
*/


/*
//query parameter
router.get('/query', (req, res, next)=>{
    const name=req.query.name;
    const email=req.query.email;
    const password=req.query.password;

    const data={
        name:name,
        email:email,
        password:password,
    }
    res.render('signup',  data);
});

router.get('/:name', (req, res, next)=>{
    const name=req.params.name;

    res.json({
        name:name
    })
});

router.get('/:profile/:occupation', (req, res, next)=>{
    const profile=req.params.profile;
    const occupation=req.params.occupation;
    const usersprofile=profile[occupation];

    res.json(
        {
           usersprofile:usersprofile
        }
    )
});

*/