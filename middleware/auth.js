const jwt=require('jsonwebtoken');
const config=require('../configure/config');
const passport=require('passport-jwt');
const {Tutor, Student, Category, Subject, Lesson}=require('../model');

exports.ifLoggedIn=async (req, res, next)=>{
    var token=req.headers['x-access-token'];
    if(!token){
        return res.status(401).json({auth:false, message:"Auth error"});
    }
    try{
        const decoded=jwt.verify(token, config.secret);
        req.student=decoded.student;
        req.tutor=decoded.tutor;
        next();
    }catch(err){
        console.log(err);
        res.status(500).send({message:"Invalid Token"})
    }
}

exports.isAdminAcess=async (req, res, next)=>{
    var token=req.headers['x-access-token'];
    const tutor=Tutor.findOne({id:req.params.isAdmin})
        if(!token){
            return res.status(401).json({auth:false, message:"Auth error"});
        }
        try{
            const decoded=jwt.verify(token, config.secret, tutor);
            req.tutor=decoded.tutor;
            next();
        }catch(err){
            console.log(err);
            res.status(500).send({message:"Acess denied"})
        }
    
}