const express = require ('express');
const User = require('../../models/User')
const router = express.Router();
const bcrypt = require('bcryptjs');

const gravatar = require('gravatar');
const keys = require('../../config/keys')

const jwt= require('jsonwebtoken');

//@route GET api/users/test
//@desc tests users router
//@access public
router.get('/test', (req, res)=> res.json({msg : "users works"}));

//@route post api/users/register
//@desc register users
//@access public

router.post('/register', (req, res)=> {
    User.findOne({ email : req.body.email})
    .then(user =>{ 
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
                console.log(salt);
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
   
   
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email}).then(user=>{
        if(!user){
            return res.status(404).json({email: 'User not found'});
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
                return res.status(400).json({password: ' incorrect password'});
            }
        });
    })


});





module.exports=router;