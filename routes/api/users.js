const express = require ('express');
const User = require('../../models/User')
const router = express.Router();
const bcrypt = require('bcryptjs');

const gravatar = require('gravatar');

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

            bcrypt.genSalt(10, (err, salt)=>{bcrypt.hash(newUser.password, salt, (err, hash)=>{
                if(err) throw error;
                newUser.password = hash;
                newUser.save()
                .then(user=> res.json(user))
                .catch(err => console.log(err));
            })})

        }
    });
})



module.exports=router;