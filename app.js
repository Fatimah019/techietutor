const express=require ("express");
const path=require('path');
const hooganMiddleware=require('hogan-middleware');
const bodyParser=require('body-parser');
const jwt=require('jsonwebtoken');
const cors=require('cors');
const mongoose=require('mongoose');
const dbConfig=require('./configure/config');
const expressValidator=require('express-validator');
const docsRouter=require('./routes/docsroute');
const homeRouter=require('./routes/homeroute');
const tutorRouter=require('./routes/tutorroute');
const studentRouter=require('./routes/studentroute');
//const adminRouter=require('./routes/adminroute');
const categoryRouter=require('./routes/category.route');
const subjectRouter=require('./routes/subject.route');
const lessonRouter=require('./routes/lesson.route');

const myOwnMiddleware=(req, res, next)=>{
    console.log("middleware applied");
    next();
}
const app=express();

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'mustache')
app.engine('mustache', hooganMiddleware.__express)

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(myOwnMiddleware);
app.use(expressValidator());
app.use('/', homeRouter);
app.use('/v1', docsRouter);
app.use('/v1', tutorRouter);
app.use('/v1', studentRouter);
//app.use('/v1', adminRouter);
app.use('/v1', categoryRouter);
app.use('/v1', subjectRouter);
app.use('/v1', lessonRouter);

mongoose.connect(dbConfig.url,
{
    useNewUrlParser:true, useUnifiedTopology:true
}
)
.then(()=>{
    console.log("Successflly connected to the database");
}).catch(err=>{
    console.log(err);
});

const port=process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("app running on port 3000")
});



module.exports=app;