const express=require("express");
const router=express.Router();
const tutor=require("../controller");
const auth=require('../middleware/auth');

//register a tutor
router.post('/signup', tutor.registerTutor);

router.get('/user/tutor', auth.ifLoggedIn,  tutor.tutorTest);
//login tutor
router.post('/login', tutor.loginTutor);//done(general 6)

//search for tutors by first name, sorted alphabetically in ascending order.
router.get('/tutor/:firstName', tutor.getTutorByFirstName)//left with sorting(general 5)

//retieve all tutors
router.get('/tutors', auth.ifLoggedIn, tutor.getTutor);//--done(admin 5)

//get a tutor by id
router.get('/tutor/:id', auth.ifLoggedIn,  tutor.getATutorById);//--undone(admin 6)

//deactivate (delete) a tutor by id
router.delete('/tutor/:id', auth.ifLoggedIn,  tutor.deactivateTutorById);//--done(admin 7)

//delete a regusterd subject
//router.delete('/subject/:name', auth.ifLoggedIn, tutor.deleteASubject);






/*
//tutors signup
router.get('/signup/tutor', (req, res, next)=>{
    res.render('signup', null);
}).post('/signup/tutor', auth.registerTutor);

//tutors dashboard
router.get('/tutors-dashboard', (req, res, next)=>{
    res.render('tutordashboard', null);
});

//tutors login
router.get('/login/tutor', (req, res, next)=>{
    res.render('login', null);
}).post('/login/tutor', auth.loginTutor);


//get subjectts from category

/*
Api test on postman
*/

//* router.get('/tutor/firstname', auth.getTutorByFirstName);






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