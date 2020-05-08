//controllers recieve requests and send responses
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
//users model
const Tutor=require('../model/tutormodel');
const Student=require('../model/studentmodel');
const Category=require('../model/categorymodel');
const Subject=require('../model/subjectmodel');

//categories controllers
//initialize categories with data, subjects
exports.init= async (req, res, next)=>{
    let sss=new Category({
        name:"SSS",
        description:"Senior Secondary Level"
    });
    sss.save(err=>{
        if(err) throw err;
    
    console.log("SSS category is added");

    //create a subject to add to SSS category
    let biology=new Subject({
        name:"Biology",
        courseCode:"BIO-101",
        textBook:"Modern Biology"
    });
    biology.save(err=>{
        if(err) throw err;
    });

    let chemistry=new Subject({
        name:"Chemistry",
        courseCode:"CHE-101",
        textBook:"Essential Chemistry"
    });
    chemistry.save(err=>{
        if(err) throw err;
    });
});

    //add another category for jss
    let jss=new Category({
        name:"JSS",
        description:"Junior Secondary Level"
    });
    jss.save(err=>{
        if(err) throw err;
    
    console.log("JSS category is added");

    //create a subject to add to SSS category
    let maths=new Subject({
        name:"Mathematics",
        courseCode:"MTH-101",
        textBook:"General Mathematics"
    });
    maths.save(err=>{
        if(err) throw err;
    });

    let english=new Subject({
        name:"English",
        courseCode:"ENG-101",
        textBook:"A1 In English"
    });
    english.save(err=>{
        if(err) throw err;
    });
});


   //add another category for primary
   let pry=new Category({
    name:"PRY",
    description:"PrimaryLevel"
    });
    pry.save(err=>{
        if(err) throw err;

    console.log("PRY category is added");

    //create a subject to add to PRY category
    let quantitative=new Subject({
        name:"Quantitative",
        courseCode:"QUA-101",
        textBook:"Quantitaive Reasoning"
    });
    quantitative.save(err=>{
        if(err) throw err;
    });

    let verbal=new Subject({
        name:"Verbal",
        courseCode:"VRB-101",
        textBook:"Verbal Reasoning"
    });
    verbal.save(err=>{
        if(err) throw err;
    });
    });
    res.send("Done with Initial Data")
}

//get all categories
exports.getAllCategories=async (req, res, next)=>{
    Category.find()
        .then(subjects=>{
            res.send(subjects);
        }).catch(err=>{
            res.status(500).send({
                message:err.message
            });
        });
};

///subject controller starts form here

//get all subjects
exports.getAllSubjects=async (req, res, next)=>{
    Subject.find()
        .then(subjects=>{
            res.send(subjects);
        }).catch(err=>{
            res.status(500).send({
                message:err.message
            })
        })
};

//get subject in a category by id
exports.getSubjectBySubjectId=async (req, res, next)=>{
    Subject.find({_id:req.params.subjectId})
    .populate('category')
    .exec((err, subject)=>{
        if(err){
            if(err.kind === 'ObjectId'){
                return res.status(404).send({
                    message:"Subject not found with the given id"
                });
            }
            return res.status(500).send({
                message:"error retrieving subjects width given id"
            });
        }
        res.send(subject);
    });
}



//get subjects by name
//
exports.getSubjectByName=async (req, res, next)=>{
    Subject.findOne({name:req.params.subjectName})
    .populate('category')
    .exec((err, subject)=>{
        if(err){
            if(err.kind === 'ObjectId'){
                return res.status(404).send({
                    message:"Subject not found"
                });
            }
            return res.status(500).send({
                message:"error retrieving subjects width given category id"
            })
        }
        res.send(subject);
    });
} ;

//find all subject by category name
exports.getSubjectByCategoryName=async (req, res, next)=>{
    Subject.find({category:req.params.categoryName})
    .exec((err, subjects)=>{
        if(err){
            if(err.kind==='ObjectId'){
                return res.send({
                    message:"Subjects not found with given id"
                })
            }
            return res.send({
                message:"error retrieving subject with a givem category"
            });
        }
        res.send(subjects);
    })
} 

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
       let student= await Student.findOne({email});
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
        res.redirect('/v1/students-dashboard');

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
    res.redirect('/v1/students-dashboard');
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
        let tutorname=await Tutor.findOne({name})
        if(tutorname){
            return res.send({name});
        }
        tutor=new Tutor({
            name,
            email,
            password,
            age,
            education
        });
       res.redirect('/v1/tutors-dashboard');
        //encrypt password
        const salt=await bcrypt.genSalt(12);
        tutor.password=await bcrypt.hash(password, salt);
        await tutor.save();
        const payload={
            tutor:{
                id:tutor.id
            }
        };
        let tutorAge=await Tutor.find({age});
        jwt.sign(
            payload, "secret", {expiresIn:10000},
            (err, token)=>{
                if (err) throw err;
                res.status(200).json({
                    token,
                })
                if (tutorAge.params.body<30){
                    return res.status(400).json({
                        message:"You are registered as a tutor only"
                    });
                }
            });

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
    res.redirect('/v1/tutors-dashboard');

    

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
    const tutors=Tutor.find()
    .select("_id name email")
    .then((tutors)=>{
        res.json({
            tutors
        })
    })
    .catch(err=>console.log(err));



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

//category

    



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