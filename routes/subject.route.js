const  subject=require('../controller');
const express=require("express");
const router=express.Router();
const auth=require('../middleware/auth');

//search for subjects by name, sorted alphabetically in ascending order.
router.get('/subject/:subjectName', auth.ifLoggedIn, subject.getSubjectByName);//half done left with sorting(general 4)
//get all subjects
router.get('/subjects', auth.ifLoggedIn, subject.getAllSubjects);//done

//retrieve a subject in a category (by Id)
router.get('/subject/category/:id', auth.ifLoggedIn, subject.getSubjectBySubjectId);//--done(general 1)

//get populated subjects in a category// retrieve all subjects, by category
router.get('/subjects/:id', auth.ifLoggedIn,  subject.getAllSubjectsByCategoryId);//--done(general 2)



    module.exports=router;