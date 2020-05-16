const categories=require('../controller');
const express=require("express");
const router=express.Router();
const auth=require('../middleware/auth');

//initialize the categoris wiith data(subjects)
    
//create a category
router.post('/category', auth.ifLoggedIn, categories.createCategory);//--done

//update subjects under 3 categories: primary, JSS, SSS by id
router.post('/categories/subjects/:id', auth.ifLoggedIn, categories.createSubject);//--done(admin 1)

//retrieve all categories
router.get('/categories',auth.ifLoggedIn, categories.getAllCategories);//--done(general 3)

//update a subject in a category (by Id)------
router.put('/category/subject/:id', auth.ifLoggedIn, categories.updateSubjectInCategoryById);
//update a category
router.put('/category/:id', auth.ifLoggedIn, categories.updateCategory);

//delete a subject in a category (by Id)
router.delete('/category/subject/:id', auth.ifLoggedIn, categories.deleteSubjectInCategoryById);

//delete a category
router.delete('/category/:name', auth.ifLoggedIn, categories.deleteCategory);



module.exports=router;