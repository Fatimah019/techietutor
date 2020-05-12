//controllers recieve requests and send responses
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
//users model
const {Tutor, Student, Admin, Category, Subject, Lesson}=require('../model');
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
//get subjects by name
exports.getSubjectByName=async (req, res)=>{
    Subject.findOne({name:req.params.subjectName})
    .then(subject=>{
       res.json(subject); 
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