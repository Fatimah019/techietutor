//controllers recieve requests and send responses
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
//users model
const Tutor=require('../model/tutormodel');
const Student=require('../model/studentmodel');
const middleWare=require('../middleware/auth');
const {check, validationResult}=require('express-validator/check');

//register student, validate and authenticate
//register tutor, validate and authenticate
exports.registerStudent=async (req, res, next)=>{
    //name
    req.check('name', "name cannot be left blank").notEmpty();
    //email
    req.check('email', "make sure your email is in the right format").isEmail();
    //password
    req.check('password', "password should contain more than 5 characters").isLength({
        min:6,
        max:20
    });

    //check for errors
    const errors=req.validationErrors()
    //if there is error , show this
    if(errors){
        const firstError=errors.map((error)=>error.msg)[0]
        return res.status(400).json({
            error:firstError
        });
            
    }

    const {name, email, password}= req.body;
    
    //authentication
       let student= await Tutor.findOne({email});
        if (student){
            return res.status(400).json({
                message:"user already exists"
            })
        }
        student=new Student({
            name,
            email,
            password
        });

        //encrypt password
        const salt=await bcrypt.genSalt(12);
        student.password=await bcrypt.hash(password, salt);
        await student.save();
        const payload={
            student:{
                id:student.id
            }
        };

        jwt.sign(
            payload, "secret", {expiresIn:10000},
            (err, token)=>{
                if (err) throw err;
                res.status(200).json({
                    token
                })
            });
};




exports.loginStudent=async (req, res, next)=>{
    //email
    req.check('email', "make sure your email is in the right format").isEmail();
    //password
    req.check('password', "password should contain more than 5 characters").isLength({
        min:6,
        max:20
    });

        //check for errors
    const errors=req.validationErrors()
    //if there is error , show this
    if(errors){
        const firstError=errors.map((error)=>error.msg)[0]
        return res.status(400).json({
            error:firstError
        });
            
    }

    const {email, password, age}=req.body;

    let student=await Student.findOne({email});
    if (!student){
        return res.status(400).json({
            message:"User does not exist"
        })
    }

    const checkMatch=await bcrypt.compare(password, student.password);
    if(!checkMatch){
        return res.status(400).json({
            message:"Incorrect password"
        });
    }

    const payload={
        student:{
            id:student.id
        }
    };
    jwt.sign(payload, "secret", {expiresIn:3600},
        (err, token)=>{
            if (err) throw err;
            res.status(200).json({
                token:token,
                mesage:"you may now see the list of categories as a student"
            })
        }
    )
};


//get student details
exports.getStudent=async (req, res, next)=>{
    const students=Student.find()
    .select("_id name email")
    .then((students)=>{
        res.json({
            students
        })
    })
    .catch(err=>console.log(err));

};



//tutor
//register tutor, validate and authenticate
exports.registerTutor=async (req, res, next)=>{
    //name
    req.check('name', "name cannot be left blank").notEmpty();
    //email
    req.check('email', "make sure your email is in the right format").isEmail();
    //password
    req.check('password', "password should contain more than 5 characters").isLength({
        min:6,
        max:20
    });
    //check if admin
    req.check('education', "fill in your education status").notEmpty();
    //check if admin
    req.check('age', "age is required").notEmpty();
    //check for errors
    const errors=req.validationErrors()
    //if there is error , show this
    if(errors){
        const firstError=errors.map((error)=>error.msg)[0]
        return res.status(400).json({
            error:firstError
        });
            
    }

    const {name, email, password, age, education}= req.body;
    
    //authentication
       let tutor= await Tutor.findOne({email});
        if (tutor){
            return res.status(400).json({
                message:"user already exists"
            })
        }
        
        tutor=new Tutor({
            name,
            email,
            password,
            age,
            education
        });

        //encrypt password
        const salt=await bcrypt.genSalt(12);
        tutor.password=await bcrypt.hash(password, salt);
        await tutor.save();
        const payload={
            tutor:{
                id:tutor.id
            }
        };

        jwt.sign(
            payload, "secret", {expiresIn:10000},
            (err, token)=>{
                if (err) throw err;
                res.status(200).json({
                    token
                })
            });

            let tutorAge=await Tutor.find({age});
            if (tutorAge<30){
                return res.status(400).json({
                    message:"You are registered as a tutor only"
                });
            }
    
            let tutorEducation=await Tutor.find({education});
            if(tutorEducation=="MSC" || tutorEducation=="BSC"){
                return res.json({
                    message:"you have been made an admin"
                });
            }
    
};


exports.loginTutor=async (req, res, next)=>{
    //email
    req.check('email', "make sure your email is in the right format").isEmail();
    //password
    req.check('password', "password should contain more than 5 characters").isLength({
        min:6,
        max:20
    });
    //check if admin
    req.check('isAdmin', "this field is required").notEmpty();

        //check for errors
    const errors=req.validationErrors()
    //if there is error , show this
    if(errors){
        const firstError=errors.map((error)=>error.msg)[0]
        return res.status(400).json({
            error:firstError
        });
            
    }

    const {email, password, age, education, isAdmin}=req.body;

    let tutor=await Tutor.findOne({email});
    if (!tutor){
        return res.status(400).json({
            message:"User does not exist"
        })
    }
    if(education=="MSC" && age>=35 && isAdmin==true){
        return res.json({
            Admin:"you have been made an admin"
        });
    }


    const checkMatch=await bcrypt.compare(password, tutor.password);
    if(!checkMatch){
        return res.status(400).json({
            message:"Incorrect password"
        });
    }

    const payload={
        tutor:{
            id:tutor.id
        }
    };
    jwt.sign(payload, "secret", {expiresIn:3600},
        (err, token)=>{
            if (err) throw err;
            res.status(200).json({
                token:token,
                mesage:"you are now an admin"
            })
        }
    )
};




//get all tutor
exports.getTutor=async (req, res, next)=>{
    try{
        const tutors=Tutor.find(req.tutors)
        .select("_id name email age education")
        res.json({
            tutors
        })
    }catch(err){
        res.send({message:"Error fetching student"})
    }

};

//fetch tutor
exports.fetchTutor=async (req, res, next)=>{
    try{
        const tutor=await Tutor.findById(req.tutor.id);
        res.json(tutor);
    }
    catch(err){
        res.send({
            message:"error in fetching"
        })
    }
};



/*
exports.studentSignUp=(req, res, next)=>{
console.log("i am now a registered user");
const username=req.body.username;
const email=req.body.email;
const password=req.body.password;

if (!email || !password || !username){
    res.status(400).send({
        status:false,
        message:"all fields are required"
    })
    return;
}
bcrypt.hash(password, 12)
.then(password=>{
    let user=new User({
        email,
        password,
    });
    return user.save();
}).then(()=>{
    res.status(200).send({
        status:true,
        message:"student registered successfully"
    }).catch(err=>{
        console.log(err);
    })
});
res.json(
    {
        message:"welcome to my app student",
        email:email,
        username:username,
    }
)
};

//admin sign up
exports.adminSignUp=(req, res, next)=>{
    console.log("i am now a registered admin");
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
    
    if (!email || !password || !username){
        res.status(400).send({
            status:false,
            message:"all fields are required"
        })
        return;
    }
    bcrypt.hash(password, 12)
    .then(password=>{
        let user=new User({
            email,
            password
        });
        return user.save();
    }).then(()=>{
        res.status(200).send({
            status:true,
            message:"admin registered successfully"
        }).catch(err=>{
            console.log(err);
        })
    });
    res.json(
        {
            message:"welcome to my app admin",
            email:email,
            username:username
        }
    )
    };

//tutor sign up
exports.tutorSignUp=(req, res, next)=>{
    console.log("i am now a registered admin");
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
    
    if (!email || !password || !username){
        res.status(400).send({
            status:false,
            message:"all fields are required"
        })
        return;
    }
    bcrypt.hash(password, 12)
    .then(password=>{
        let user=new User({
            email,
            password,
        });
        return user.save();
    }).then(()=>{
        res.status(200).send({
            status:true,
            message:"admin registered successfully"
        }).catch(err=>{
            console.log(err);
        })
    });
    res.send(
      `
      <html>
      <h1>hello tutor</h1>
      </html>
      `
    )
    }
    
    ;
    
*/
/*

/*
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const Admin=require('../model/adminmodel');
const {check, validationErrors}=require('express-validator/check');

//register admin, validate and authenticate
exports.registerAdmin=async (req, res, next)=>{
    req.check('name', "name cannot be left blank").notEmpty();
    //email
    req.check('email', "make sure your email is in the right format").isEmail();
    //password
    req.check('password', "password should contain more than 5 characters").isLength({
        min:6,
        max:20
    });

    //check for errors
    const errors=req.validationErrors()
    //if there is error , show this
    if(errors){
        const firstError=errors.map((error)=>error.msg)[0]
        return res.status(400).json({
            error:firstError
        });
        
    }
    
        const {name, email, password}= req.body;
            
            //authentication
           let admin= await Admin.findOne({email});
            if (admin){
                return res.status(400).json({
                    message:"user already exists"
                })
            }

            admin=new Admin({
                name,
                email,
                password
                
            });

            //encrypt password
            const salt=await bcrypt.genSalt(12);
            admin.password=await bcrypt.hash(password, salt);
            await admin.save();
            const payload={
                admin:{
                    id:admin.id
                }
            };

            jwt.sign(
                payload, "secret", {expiresIn:10000},
                (err, token)=>{
                    if (err) throw err;
                    res.status(200).json({
                        token
                    })
                });

};


//login authentication for admin
exports.loginAdmin=async (req, res, next)=>{
    
    //email
    req.check('email', "make sure your email is in the right format").isEmail();
    //password
    req.check('password', "password should contain more than 5 characters").isLength({
        min:6
    });
        //check for errors
        const errors=req.validationErrors()
        //if there is error , show this
        if(errors){
            const firstError=errors.map((error)=>error.msg)[0]
            return res.status(400).json({
                error:firstError
            });
                
        }

        const {email, password}=req.body;

        let admin=await Admin.findOne({email});
        if (!admin){
            return res.status(400).json({
                message:"User does not exist"
            })
        }


        const checkMatch=await bcrypt.compare(password, admin.password);
        if(!checkMatch){
            return res.status(400).json({
                message:"Incorrect password"
            });
        }

        const payload={
            admin:{
                id:admin.id
            }
        };
        jwt.sign(payload, "secret", {expiresIn:3600},
            (err, token)=>{
                if (err) throw err;
                res.status(200).json({
                    token:token
                })
            }
        )
};

//return admin details when logged in
exports.getAdmin=async (req, res, next)=>{
    Admin.find({}, (err, users)=>{
        if(err) throw err;
        if(Admin){
            res.json({
                admin:users
            })
        }
    });
}
/*
end of admin sign up and login authentication
*/

/*
//admin registration
exports.adminSignUp=(req, res, next)=>{
    res.render('signup', null);
};

//get all admin

exports.getAllAdmin=(req, res, next)=>{
    const adminUsers=Admin.find()
    //.select(_id, name, email, password)
    .then(adminUsers=>{
        res.json({adminUsers:adminUsers})
        .catch(err=>{
            console.log(err);
        })
    })
};
//create new admin
exports.createAdmin=(req, res, next)=>{
    const admin=new Admin(req.body);
    //console.log("creating user" + req.body);
    admin.save((err, result)=>{
        if (err){
            return res.status(200).json({
                error:err
            })
        }
        res.status(200).json({
            admin:result
        })
    });
    admin.save().then(result=>{
        res.json({
            post:result
        });
    });
}

exports.createSubject=(req, res, next)=>{
    //maths, eng
}
exports.createCategory=(req, res, next)=>{
    //primary, jss, sss
}
exports.updateSubject=(req, res, next)=>{
    //update subjects in each category
}
exports.getTutor=(req, res, next)=>{
    //get a tutor by id
}
    /*db.collection('details').insertMany(data,function(err, result){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
        console.log(result);
    }); 
          
    return res.send('this is the login page'); 
            await User.findOne({email: req.body.email})
        .then(email_exist=>{
            if (email_exist){
                return res.status(409)
                .json({
                    success:false,
                    message:"email exists already"
                })
            }
        })
*/
  


    //admin login
   /* exports.adminLogin=(req, res, next)=>{
        const email=req.body.email;
        const password=req.body.password;
        
        if (!email || !password){
            res.status(400).send({
                status:false,
                message:"all fields are required"
            })
            return;
        }
        res.sendFile(__dirname + '/form.html');
        };
    */