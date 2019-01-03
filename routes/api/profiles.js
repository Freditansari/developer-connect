const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");

//load profile model
const Profile = require("../../models/Profile");

//Load user model
const User = require("../../models/User");

const ValidateProfileInput = require("../../validation/profile");
const ValidateExperienceInput = require("../../validation/experience");
const ValidateEducationInput = require("../../validation/education");

router.get("/test", (req, res) => res.json({ msg: "profile works" }));

//@route get api/profiles/handle/:handle
//@desc get profile by handle
//@access public

router.get("/handle/:handle", (req, res) => {
  const errors = {};
  //getting a url parameter using req.params.handle
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "there is no profile associated to this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//@route get api/profile/all
//@desc get all profile
//@access public

router.get("/all", (req, res) => {
  const errors = {};
  //getting a url parameter using req.params.handle
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "there are no profiles";
        res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json(err));
});

//@route get api/profile/id/:user_id
//@desc get profile by id
//@access public

router.get("/id/:user_id", (req, res) => {
  const errors = {};
  //getting a url parameter using req.params.handle
  Profile.findOne({ _id: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "there is no id associated to this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//@route get api/profile/
//@desc returns current user profile
//@access private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "there is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route post api/profile/
//@desc create or edit user profile
//@access private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //validate the sent data.
    const { errors, isValid } = ValidateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    //mapping requests to profile models
    const profileFields = {};

    profileFields.user = req.user.id;

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.status) profileFields.status = req.body.status;

    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    //skill split into array (CSV SPLIT)
    if (typeof req.body.skills !== "undefined") {
      let skills = req.body.skills.split(",");
      let trimmedSkills = [];
      skills.map(skill => {
        trimmedSkills.push(skill.trim());
      });

      profileFields.skills = trimmedSkills;
    }

    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //update

        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // create new profile

        //check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          // if profile exist throw 400
          if (profile) {
            errors.handle = "that handle already exists";
            res.status(400).json(errors);
          }
          //save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

//@route post api/profile/experience
//@desc create experience to profile
//@access private

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      //add to experience array to the top of the lists
      profile.experience.unshift(newExp);
      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route post api/profile/education
//@desc create education to profile
//@access private

router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidateEducationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      //add to experience array to the top of the lists
      profile.education.unshift(newEdu);
      profile.save().then(profile => res.json(profile));
    });

    //  Profile.find({$or:[{$text:{$search:'html'}}]})
    // .then(profile => {
    //    console.log(profile);
    //    res.json(profile);
    // }).catch(err => console.log(err));
  }
);

router.post("/search", (req, res) => {
  Profile.find({ skills: req.body.search })
    .then(profile => {
      console.log(profile);
      res.json(profile);
    })
    .catch(err => console.log(err));
});

//@route delete api/profile/experience/:exp_id
//@desc delete experience in profile
//@access private

router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //get which id to be removed
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        //splice out of array
        profile.experience.splice(removeIndex, 1);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route delete api/profile/education/:edu_id
//@desc delete education in profile
//@access private

router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //get which id to be removed
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        //splice out of array
        profile.education.splice(removeIndex, 1);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route delete api/profile/
//@desc delete user and profile
//@access private

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user.id);

    //remove profile
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      //remove user
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
