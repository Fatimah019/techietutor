######Categories routes
####Root Endpoint:  “https://thetechytutor.herokuapp.com/v1/”

VERB:POST
//create a category
     '/category'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/category

Fields:
name:	 SSS
description:	Senior Secondary level

//update subjects under 3 categories: primary, JSS, SSS by id
     '/categories/subjects/:id'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/categories/5eb9a814b1b6001ab4b14b46

Fields:
name:	 SSS
description:	Senior Secondary level


VERB:GET
//retrieve all categories
     '/categories'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/categories

VERB:PUT
//update a subject in a category (by Id)
     '/category/subject/:id'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/category/subject/5eb9aea8c3338724d470c06a
Fields:
name:	 SSS
description:	Senior Secondary level

     
//update a category
     '/category/:id'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/category/5eb9aea8c3338724d470c06a
Fields:
name:	 SSS
description:	Senior Secondary level


VERB:DELETE
//delete a subject in a category (by Id)
     '/category/subject/:id'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/category/5eb9aea8c3338724d470c06a

//delete a category
     '/category/:name'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/category/JSS
     


5eb9a814b1b6001ab4b14b46
Root Endpoint:  “https://thetechytutor.herokuapp.com/v1/”
Subjects routes
VERB:POST
//create subjects in a category
     '/categories/subject/:categoryid
EXAMPLE: https://thetechytutor.herokuapp.com/v1/categories/subjects/category:id
Fields:
name:	 subject name
courseCode: subject course code
textbook: text book to use for a subject


VERB:GET
//search for subjects by name, sorted alphabetically in ascending order.
     '/subject/:subjectName'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/subject/Biology
     
//get all subjects
     '/subjects'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/category/subjects

//retrieve a subject in a category (by Id)
     '/subject/category/:id
EXAMPLE: https://thetechytutor.herokuapp.com/v1/category/5eb9aea8c3338724d470c06a

//get populated subjects in a category// retrieve all subjects, by category
     '/subjects/:id'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/subjects/5eb9aea8c3338724d470c06a
     

Root Endpoint:  “https://thetechytutor.herokuapp.com/v1/”
Lessons routes

VERB:POST
//create a lesson
     '/lessons/:id'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/lesson
EXAMPLE: https://thetechytutor.herokuapp.com/v1/lesson
Fields:
title:	title one
note:	note one


VERB:GET
//get all lessons by subject id
     '/lessons/:id'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/lessons/5eb9aea8c3338724d470c06a

//get all lessons
     '/lessons'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/lessons

//get a lesson by id
     '/lesson/:id'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/lesson/5eb9aea8c3338724d470c06a

VERB:PUT
//update a lesson by id
     '/lesson/:id'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/lesson/5eb9aea8c3338724d470c06a
Fields:
title:	title one
note:	note one


VERB:DELETE
//delete a lesson by id
     '/lesson/:id'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/lesson/5eb9aea8c3338724d470c06a
     


Students routes
Root Endpoint:  “https://thetechytutor.herokuapp.com/v1/”


VERB:POST

//register a student
     '/student/signup'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/student/signup
Fields:
First:	 firstname
Last:	lastname
Email:	emailaddress
Password:	password


//login students
     '/student/login'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/category
EXAMPLE: https://thetechytutor.herokuapp.com/v1/student/login
Fields:
Email:	emailaddress
Password:	password

VERB:GET
//get all student details
     '/students'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/students
     

Tutors routes
Root Endpoint:  “https://thetechytutor.herokuapp.com/v1/”

VERB:POST

//register a tutor
     '/signup'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/signup
Fields:
First:	 firstname
Last:	lastname
Email:	emailaddress
Password:	password



//login tutor
     '/login'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/login
Fields:
Email:	emailaddress
Password:	password


//search for tutors by first name, sorted alphabetically in ascending order.
     '/tutor/:firstName'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/tutor/Tutorsfirstname


//retieve all tutors
     '/tutors'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/tutors

//get a tutor by id
     '/tutor/:id'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/tutor/5eb9aea8c3338724d470c06a

//deactivate (delete) a tutor by id
     '/tutor/:id'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/tutor/5eb9aea8c3338724d470c06a
     




Error Messages
Status: 200 ----------------Success
Status: 400 ----------------Page not found
Status: 401 ----------------Access denied/Authorization error

Admin Login details
Email :	 admin@mail.com
Password:	adminpass

Note: All routes are protected. Only authenticated logged in users can  have access to routes based on their specified roles

