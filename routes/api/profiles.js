const express = require ('express');
const router = express.Router();

const mongoose = require ('mongoose');
const passport = require('passport');

//load profile model 
const Profile = require('../../models/Profile');
const User = require('../../models/User');

const ValidateProfileInput = require('../../validation/profile')



router.get('/test', (req, res)=> res.json({msg : "profile works"}));


//@route get api/profiles/handle/:handle
//@desc get profile by handle
//@access public

router.get('/handle/:handle',(req, res)=>{
    const errors={};
    //getting a url parameter using req.params.handle
    Profile.findOne({handle: req.params.handle})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile){
            errors.noprofile = 'there is no profile associated to this user';
            res.status(404).json(errors);
        }
        res.json(profile);
    }).catch(err => res.status(404).json(err));
});

//@route get api/profile/all
//@desc get all profile
//@access public

router.get('/all',(req, res)=>{
    const errors={};
    //getting a url parameter using req.params.handle
    Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
        if (!profiles) {
            errors.noprofile = 'there are no profiles';
            res.status(404).json(errors);  
        }
        res.json(profiles)
    })
    .catch(err => res.status(404).json(err));
});


//@route get api/profile/id/:user_id
//@desc get profile by id
//@access public

router.get('/id/:user_id',(req, res)=>{
    const errors={};
    //getting a url parameter using req.params.handle
    Profile.findOne({_id: req.params.user_id})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile){
            errors.noprofile = 'there is no id associated to this user';
            res.status(404).json(errors);
        }
        res.json(profile);
    }).catch(err => res.status(404).json(err));
});


//@route get api/profile/
//@desc returns current user profile
//@access private


router.get('/',  passport.authenticate('jwt', {session: false}), (req, res)=>{

    const errors={};
    Profile.findOne({user: req.user.id})
    .populate('user', ['name', 'avatar'])
    .then(profile=>{
        if(!profile){
            errors.noprofile ='there is no profile for this user'
            return res.status(404).json(errors)
        }
        res.json(profile);
    })
        .catch(err=> res.status(404).json(err));

});

//@route post api/profile/
//@desc create or edit user profile
//@access private

router.post('/',  passport.authenticate('jwt', {session: false}), (req, res)=>{

    //validate the sent data. 
    const { errors, isValid}= ValidateProfileInput(req.body);

    if(!isValid){
        return res.status(400).json(errors)
    }

    //mapping requests to profile models
    const profileFields ={};


    profileFields.user = req.user.id;

    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.status) profileFields.status= req.body.status;
    
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    //skill split into array (CSV SPLIT)
    if(typeof req.body.skills!== "undefined"){
        profileFields.skills = req.body.skills.split(',');
    }


    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;


    Profile.findOne({user:req.user.id}).then(profile=>{
        if (profile){
            //update

            Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileFields},
                {new: true}).then(profile => res.json(profile));
        } else{
            // create new profile

            //check if handle exists
            Profile.findOne({handle: profileFields.handle}).then(profile=>{

                // if profile exist throw 400
                if(profile){
                    errors.handle = 'that handle already exists';
                    res.status(400).json(errors);

                }
                //save profile 
                new Profile(profileFields).save().then(profile=>res.json(profile));
            })


        }
    });







});






module.exports=router;