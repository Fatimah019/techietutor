const  subject=require('../controller/auth');
const express=require("express");
const router=express.Router();

    //get all subjects
    router.get('/subjects', subject.getAllSubjects);//done
    //search for subjects by name, sorted alphabetically in ascending order.
    router.get('/subjects/:subjectName', subject.getSubjectByName);//half done left with sorting
    //retrieve all subjects, by category
    router.get('/subjects/:category', subject.getSubjectByCategoryName);

    module.exports=router;