const lesson=require('../controller');
const express=require("express");
const router=express.Router();
const auth=require('../middleware/auth');

//create alesson
router.post('/lessons/:id', auth.ifLoggedIn,  lesson.bookLessons);

//get all lessons by subject id
router.get('/lessons/:id', auth.ifLoggedIn, lesson.getAllLessonsBySubjectId);

//get all lessons
router.get('/lessons', auth.ifLoggedIn, lesson.getAllLessons);

//get a lesson by id
router.get('/lesson/:id', auth.ifLoggedIn, lesson.getALessonByLessonId);

//update a lesson by id
router.put('/lesson/:id', auth.ifLoggedIn, lesson.updateALesson);

//delete a lesson by id
router.delete('/lesson/:id', auth.ifLoggedIn, lesson.deleteALessonById);

    
module.exports=router;