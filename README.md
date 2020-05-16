# Online Tutoring App (API) 
Paragraph of project description goes here


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


### Prerequisites


What things you need to install the software and how to install them


```
Give examples
```


### Installing

A step by step series of examples that tell you how to get a development env running


Say what the step will be


```
Give the example
```


And repeat


```
until finished
```


End with an example of getting some data out of the system or using it for a little demo


## Running the tests

Explain how to run the automated tests for this system


### Break down into end to end tests

Explain what these tests test and why


```
Give an example
```


### And coding style tests

Explain what these tests test and why


```
Give an example
```


## Deployment

Add additional notes about how to deploy this on a live system


## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 


## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc



Categories routes
######Root Endpoint:  “https://thetechytutor.herokuapp.com/v1/”

###VERB:POST
//create a category
     '/category'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/category

//update subjects under 3 categories: primary, JSS, SSS by id
     '/categories/subjects/:id'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/categories/5eb9a814b1b6001ab4b14b46

VERB:GET
//retrieve all categories
     '/categories'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/categories

VERB:PUT
//update a subject in a category (by Id)
     '/category/subject/:id'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/category/subject/5eb9aea8c3338724d470c06a
     
//update a category
     '/category/:id'
EXAMPLE: https://thetechytutor.herokuapp.com/v1/category/5eb9aea8c3338724d470c06a

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
EXAMPLE: https://thetechytutor.herokuapp.com/v1/category
EXAMPLE: https://thetechytutor.herokuapp.com/v1/lesson/5eb9aea8c3338724d470c06a

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
