//controllers recieve requests and send responses
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('../configure/config');

//users model
const {Tutor, Student, Category, Subject, Lesson}=require('../model');
//const Admin=require('../model/adminmodel');


//categories controllers
//create a category(init)done
exports.createCategory=async (req, res)=>{
    Category.create(req.body)
    .then(categories=>{
        res.send(categories)
    }).catch(err=>{
        res.send(err);
    })
}

//retrieve all subjects, by category(general 2)
exports.getAllSubjectsByCategoryId=async (req, res)=>{
    Category.findOne({_id:req.params.id})
    .populate('subjects')
    .then(dbsubjects=>{
        res.send(dbsubjects);
    }).catch(err=>{
        res.send(err);
    })
}

//get all categories(general 3)
exports.getAllCategories=async (req, res)=>{
    Category.find({})
        .then((categories)=>{
            res.send(categories);
        }).catch(err=>{
            res.status(500).send({
                message:err.message
            })
        })
};

//delete update a category by name
exports.deleteCategory=async (req, res)=>{
    Category.deleteOne({name:req.params.name})
    .then((deletedCategory)=>{
        res.json({
            message:"category deleted  successfully",
            deletedCategory
        })
    }).catch(err=>{
        res.send(err);
    })
}

//update a category by id
exports.updateCategory=async (req, res)=>{
    Category.findByIdAndUpdate({_id:req.params.id}, req.body, (err, updatedCategory)=>{
        if(err){
            return res.send(err)
        }
        res.send({
            message:"category updated  successfully",
            updatedCategory
        });
    })
}


//subject controller starts here
//create a subject in a category and save to a category(admin1)done
exports.createSubject=async (req, res)=>{
    Subject.create(req.body)
    .then(subjectdb=>{
        return Category.findOneAndUpdate({_id:req.params.id}, {$push:{subjects:subjectdb._id}}, {new:true})
    }).then(categorydb=>{
        res.json(categorydb);
    }).catch(err=>{
        res.json({
            "message":"cannot update category with subject"
        })
    })
}

//get a subject in a category by id(general 1)
exports.getSubjectBySubjectId=async (req, res)=>{
    Subject.findOne({_id:req.params.id})
    .then(subject=>{
        res.json(subject); 
     }).catch(err=>{
         res.send(err);
     })
}

//get subjects by name
exports.getSubjectByName=async (req, res)=>{
    Subject.findOne({name:req.params.subjectName})
    .then(subject=>{
       res.json(subject); 
    }).catch(err=>{
        res.json(err);
    })
};

//update a subject in a category (by Id)------
exports.updateSubjectInCategoryById=async (req, res)=>{
    Subject.findByIdAndUpdate(req.params.id, req.body, (err, updatedDoc)=>{
        if(err){
            return res.send(err)
        }
        res.send(updatedDoc);
    })
}

//delete a subject in a category (by Id)
exports.deleteSubjectInCategoryById=async (req, res)=>{
    Subject.findByIdAndDelete({_id:req.params.id})
   .then((deletedSubject)=>{
        res.send(deletedSubject);
    }).catch(err=>{
        res.json({
            "message":"error while deleting subject"
        })
    })
}

//delete a subjects
exports.getAllSubjects=async (req, res)=>{
    Subject.find()
    .then(subjects=>{
        res.send(subjects)
    }).catch(err=>{
        res.send(err);
    })
}

//retrieve all lessons, by subject id(general 2)
exports.getAllLessonsBySubjectId=async (req, res)=>{
    Subject.findOne({_id:req.params.id})
    .populate('lessons')
    .then(dblessons=>{
        res.send(dblessons);
    }).catch(err=>{
        res.send(err);
    })
}


//lesson controller starts here
//book a lesson(populate lessons inside subjects)
exports.bookLessons=async (req, res)=>{
    Lesson.create(req.body)
    .then(lessondb=>{
        return Subject.findOneAndUpdate({_id:req.params.id}, {$push:{lessons:lessondb._id}}, {new:true})
    }).then(subjectdb=>{
        res.json(subjectdb);
    }).catch(err=>{
        res.json({
            "message":"cannot update subject with lessons"
        })
    })
}

//get all lessons
exports.getAllLessons=async (req, res)=>{
    Lesson.find()
    .then(lessons=>{
        res.json({
            lessons
        })
    }).catch(err=>{
        res.send({
            message:"cannot get all lessons"
        })
    })
}

//get a lesson by lesson id
exports.getALessonByLessonId=async (req, res)=>{
    Lesson.findOne({_id:req.params.id})
    .then(lesson=>{
        res.send(lesson);
    }).catch(err=>{
        res.send(err);
    })
}

//update a lesson by id
exports.updateALesson=async (req, res)=>{
    Lesson.findByIdAndUpdate(req.params.id, req.body, (err, updatedLesson)=>{
        if(err){
            return res.send(err)
        }
        res.send(updatedLesson);
    })
}

//delete a lesson by id
exports.deleteALessonById=async (req, res)=>{
    Lesson.findOneAndDelete({_id:req.params.id})
    .then((deletedLesson)=>{
        res.send({
            success:"lesson has been deleted",
            deletedLesson
        })
    })
}


//students controllers
//register student, validate and authenticate
//register tutor, validate and authenticate

exports.registerStudent=async (req, res, next)=>{
    //validate users input
    req.check('first', "name cannot be left blank").notEmpty();
    
    req.check('last', "name cannot be left blank").notEmpty();
    
    req.check('email', "make sure your email is in the right format").isEmail();
    
    req.check('password', "password should contain more than 5 characters").isLength({
        min:6,
        max:20
    });

    
    const errors=req.validationErrors()
    if(errors){
        const firstError=errors.map((error)=>error.msg)[0]
        return res.status(400).json({
            error:firstError
        });     
    };

    const {first, last, email, password, role}= req.body;
    try{
    
    let student= await Student.findOne({email});
    if (student){
        return res.status(400).json({
            message:"user already exists"
        })
    }         
        student=new Student({
            first,
            last,
            email,
            password,
            role
        });
        const salt=await bcrypt.genSalt(10);
        student.password= await bcrypt.hash(password, salt);
        await student.save();
        const payload={
            studentid:{id:student.id},
            role:{
                student:true,
                admin:false,
                tutor:false
            }
        };
        jwt.sign(
            payload,
            config.secret,{expiresIn:10000},
            (err, token)=>{
                if (err) throw err;
                res.status(200).json({
                    data:student,
                    auth:true,
                    token
                });
            }
        )
    }catch(err){
        res.send(err);
    }
};

exports.studentTest=async (req, res)=>{
    try{
        const student=await Student.findById(req.student.id);
        res.json(student);
    }catch(err){
        res.send(err);
    }
}

//student login
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

    const {email, password}=req.body;
    try{
    
    let student=await Student.findOne({email});
    if (!student){
        return res.status(400).json({
            message:"User does not exist"
        })
    }

    const validPassword=await bcrypt.compare(password, student.password);
    if(!validPassword){
        return res.status(400).json({
            message:"Incorrect password"
        });
    }
    const payload={
        studentid:{id:student.id},
        role:{
            student:true,
            admin:false,
            tutor:false
        }
    };
    jwt.sign(
        payload,
        config.secret,
        {expiresIn:3600},
        (err, token)=>{
            if (err) throw err;
            res.status(200).json({
                data:student,
                token
            })
        }
        )
    }catch(err){
        next(err);
    }
};

//get student details
exports.getStudent=async (req, res, next)=>{
    Student.find()
    .select("_id name email")
    .then((students)=>{
        res.json({
            students
        })
    })
    .catch(err=>console.log(err));
};


//tutor controllers starts here
//register tutor, validate and authenticate
exports.registerTutor=async (req, res, next)=>{
    //validate users input
    req.check('first', "name cannot be left blank").notEmpty();
    
    req.check('last', "name cannot be left blank").notEmpty();
    
    req.check('email', "make sure your email is in the right format").isEmail();
    
    req.check('password', "password should contain more than 5 characters").isLength({
        min:6,
        max:20
    });

    
    const errors=req.validationErrors()
    if(errors){
        const firstError=errors.map((error)=>error.msg)[0]
        return res.status(400).json({
            error:firstError
        });     
    };

    const {first, last, email, password, role, isAdmin}= req.body;
    try{
    
    let tutor= await Tutor.findOne({email});
    if (tutor){
        return res.status(400).json({
            message:"user already exists"
        })
    }      
    //eval(require('locus'));   
    if (req.params.isAdmin==="secretCode123"){
        tutor.isAdmin=true;
    }
    tutor=new Tutor({
            first,
            last,
            email,
            password,
            isAdmin,
            role
        });
        if(tutor && tutor.isAdmin){
            res.send({
                message:"you are an admin",
                tutor
            })
        }
        const salt=await bcrypt.genSalt(10);
        tutor.password= await bcrypt.hash(password, salt);
        await tutor.save();
        const payload={
            tutor:{
                id:tutor._id, 
                isAdmin:tutor.isAdmin
            }
        };
        jwt.sign(
            payload,
            config.secret,{expiresIn:10000},
            (err, token)=>{
                if (err) throw err;
                res.status(200).json({
                    data:tutor,
                    auth:true,
                    token
                });
            }
        )
    }catch(err){
        res.send(err);
    }
};

//login tutors
exports.loginTutor=async (req, res, next)=>{
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
    const {email, password}=req.body;
    try{
    
    let tutor=await Tutor.findOne({email});
    if (!tutor){
        return res.status(400).json({
            message:"User does not exist"
        })
    }

    const validPassword=await bcrypt.compare(password, tutor.password);
    if(!validPassword){
        return res.status(400).json({
            message:"Incorrect password"
        });
    }
    const payload={
        tutor:{
            id:tutor._id, 
            isAdmin:tutor.isAdmin
        }
    };
    jwt.sign(
        payload,
        config.secret,
        {expiresIn:3600},
        (err, token)=>{
            if (err) throw err;
            res.status(200).json({
                data:tutor,
                token
            })
        }
        )
    }catch(err){
        next(err);
    }
    
};
exports.tutorTest=async (req, res)=>{
    try{
        const tutor=await Tutor.findById(req.tutor.id);
        res.json(tutor);
    }catch(err){
        res.send(err);
    }
}

//get all tutor
exports.getTutor=async (req, res)=>{
    Tutor.find()
    .select("_id first last email education")
    .then((tutors)=>{
        res.json({
            tutors
        })
    })
    .catch(err=>console.log(err));
};

//get tutor by id
exports.getATutorById=async (req, res)=>{
    Tutor.findOne({_id:req.params.id})
    .select("_id first last email education")
    .then(tutor=>{
       res.json(tutor); 
    }).catch(err=>{
        res.json(err);
    })
};

//deactivate tutor by id
exports.deactivateTutorById=async (req, res, next)=>{
    Tutor.findOneAndRemove({_id:req.params.id})
    .then(tutor=>{
       res.send({success:"tutor has been deactivated"}); 
    }).catch(err=>{
        res.json(err);
    })
};

//get tutor by first name
exports.getTutorByFirstName=async (req, res)=>{
    Tutor.findOne({first:req.params.firstName})
    .select("_id first last email education")
    .then(tutorFirstName=>{
        res.json(tutorFirstName)
    }).catch(err=>{
        res.json(err);
    })
}




//extras





















































//tutor

/*



/*
//admin login
exports.loginAdmin=async (req, res, next)=>{
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
           res.redirect('/v1/admin-dashboard');
       
           
       
           const payload={
               admin:{
                   id:admin.id
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
}
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