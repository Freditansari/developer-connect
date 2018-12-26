const express = require ('express');
const router = express.Router();

const mongoose = require ('mongoose');
const passport = require('passport');

//load profile model 
const Profile = require('../../models/Profile');
const User = require('../../models/User');



router.get('/test', (req, res)=> res.json({msg : "profile works"}));

//@route get api/profile/
//@desc get current user profile
//@access public

router.get('/',  passport.authenticate('jwt', {session: false}), (req, res)=>{});




module.exports=router;