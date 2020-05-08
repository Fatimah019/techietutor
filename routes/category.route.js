const categories=require('../controller/auth');
const express=require("express");
const router=express.Router();

    router.get('/categories/init', categories.init);
     //retrieve all categories
    router.get('/categories', categories.getAllCategories);//done
     //retrieve a subject in a category (by Id)
     router.get('/category/:subjectId', categories.getSubjectBySubjectId);//done

module.exports=router;