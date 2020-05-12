Categories routes
Root Endpoint:  “https://thetechytutor.herokuapp.com/v1/”

VERB:POST
//create a category
     '/category'

//update subjects under 3 categories: primary, JSS, SSS by id
     '/categories/subjects/:id'

VERB:GET
//retrieve all categories
     '/categories'

VERB:PUT
//update a subject in a category (by Id)
     '/category/subject/:id'
     
//update a category
     '/category/:id'

VERB:DELETE
//delete a subject in a category (by Id)
     '/category/subject/:id'

//delete a category
     '/category/:name'
     


Root Endpoint:  “https://thetechytutor.herokuapp.com/v1/”
Subjects routes

VERB:GET
//search for subjects by name, sorted alphabetically in ascending order.
     '/subject/:subjectName'
     
//get all subjects
     '/subjects'

//retrieve a subject in a category (by Id)
     '/subject/category/:id

//get populated subjects in a category// retrieve all subjects, by category
     '/subjects/:id'
     

Root Endpoint:  “https://thetechytutor.herokuapp.com/v1/”
Lessons routes

VERB:POST
//create a lesson
     '/lessons/:id'

VERB:GET
//get all lessons by subject id
     '/lessons/:id'

//get all lessons
     '/lessons'

//get a lesson by id
     '/lesson/:id'

VERB:PUT
//update a lesson by id
     '/lesson/:id'

VERB:DELETE
//delete a lesson by id
     '/lesson/:id'
     


Students routes
Root Endpoint:  “https://thetechytutor.herokuapp.com/v1/”


VERB:POST

//register a student
     '/student/signup'

//login students
     '/student/login'

VERB:GET
//get all student details
     '/students'
     

Tutors routes
Root Endpoint:  “https://thetechytutor.herokuapp.com/v1/”

VERB:POST

//register a tutor
     '/signup'

//login tutor
     '/login'

//search for tutors by first name, sorted alphabetically in ascending order.
     '/tutor/:firstName'

//retieve all tutors
     '/tutors'

//get a tutor by id
     '/tutor/:id'

//deactivate (delete) a tutor by id
     '/tutor/:id'
     


