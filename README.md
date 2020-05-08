# techietutor
Overview
By default, all requests to https://techietutor.herokuapp.com/v1 receive the v3 version of the REST API

the following are the endpoints
//retrieve all categories
    Verb:GET '/categories'

//get all subjects
    Verb:GET '/subjects'

//retrieve a subject in a category (by Id)
    Verb:GET '/subject/category/:categoryId'

//search for subjects by name, sorted alphabetically in ascending order.
    Verb:GET '/subjects/:subjectName'

//retrieve all subjects, by category
    Verb:GET '/subjects/category/:categoryName'

POST METHODS
//register an tutor
Verb:POST'/signup'

//login tutor
Verb:POST '/login'

