exports.createUsersValidator=(req, res, next)=>{
    //name
    req.check('name', "name cannot be left blank").notEmpty();

    //email
    req.check('email', "make sure your email is in the right format").isEmail();
    //password
    req.check('password', "password should contain more than 5 characters").isLength({
        min:6,
        max:20
    });

    //check for errors
    const errors=req.validationErrors()
    //if there is error , show this
    if(errors){
        const firstError=errors.map((error)=>error.msg)[0]
        return res.status(400).json({
            error:firstError
        });
            
    }
    res.render('doc', null);
};

