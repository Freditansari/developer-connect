const express = require ('express');
const User = require('../../models/User')
const router = express.Router();

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
            const newUser = new User({
                name: req.body.name,
                email: req.body.email, 
                avatar,
                password: req.body.password
            });

        }
    });
})



module.exports=router;