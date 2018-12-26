const express = require ('express');
const User = require('../../models/User')
const router = express.Router();
const bcrypt = require('bcryptjs');

const gravatar = require('gravatar');
const keys = require('../../config/keys')

const jwt= require('jsonwebtoken');

const passport = require ('passport');

//load input validation
const validateRegisterInput = require('../../validation/register')

const validateLoginInput = require('../../validation/login')

//@route GET api/users/test
//@desc tests users router
//@access public
router.get('/test', (req, res)=> res.json({msg : "users works"}));

//@route post api/users/register
//@desc register users
//@access public

router.post('/register', (req, res)=> {

    /**validate register input is a method located in validation register.js file. 
     * this method is used to perform a check for the fields pertaining to the register API 
     */
    const { errors, isValid}= validateRegisterInput(req.body);
    

    /** it checks the validation results from the validateRegisterInput Method. 
     * if it fails return a 400 along with the errors variable message from the register.js
     * else continues
    */
    if(!isValid){
        return res.status(400).json(errors)
    }

    User.findOne({ email : req.body.email})
    .then(user =>{
        /**
         * on these lines, basically after mongoose findOne if the user variable is empty, 
         * then the user returns 400 error with email already exist message. 
         * 
         * else 
         * 
         * they setup a new User(as per User model for mongoose). and then encrypt the password 
         * using bcrypt method.  */ 
        if(user){
            return res.status(400).json({email: 'Email already exists'})
        }else {
            const avatar = gravatar.url(req.body.email, {
                s: '200', //size
                rating:'pg',
                d:'mm'
            })
            const newUser = new User({
                name: req.body.name,
                email: req.body.email, 
                avatar,
                password:  req.body.password
            });

            bcrypt.genSalt(10, (err, salt)=>{
             
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                if(err) throw error;
                newUser.password = hash;
                newUser.save()
                .then(user=> res.json(user))
                .catch(err => console.log(err));
            })})

        }
    });
});

//@route post api/users/login
//@desc login user and returns jwt token
//@access public

router.post('/login', (req, res)=>{

    const { errors, isValid}= validateLoginInput(req.body);
    

    //check validation
    if(!isValid){
        return res.status(400).json(errors)
    }
   
   
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email}).then(user=>{
        if(!user){
            errors.email = 'User not found'
            return res.status(404).json(errors);
        }

        //match password
        bcrypt.compare(password, user.password)
        .then(isMatch =>{
            if (isMatch){
                const payload = {
                    id: user.id,
                    name: user.name, 
                    avatar: user.avatar 
                }

                jwt.sign(
                    payload,
                     keys.secretOrKey,
                     { expiresIn: 3600}, 
                     (err, token)=>{
                         res.json({    
                            success: true,
                            token: 'Bearer '+ token
                        });
                    
                     });

                //return jwt here
                //  res.json({msg: 'Success'});
            }else{
                errors.password = 'password incorrect'
                return res.status(400).json(errors);
            }
        });
    })


});


//@route post api/users/current
//@desc returns current user 
//@access private


router.get('/current', passport.authenticate('jwt', {session: false}), (req, res)=>{
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });

});




module.exports=router;