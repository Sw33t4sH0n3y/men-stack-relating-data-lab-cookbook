const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
       
        res.locals.users = users;

        res.render('users/index.ejs');
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
});

router.get('/:userId', async (req, res) => {
    try {
      const userProfile =await User.findById(req.params.userId);
      
      res.locals.userProfile = userProfile;
      res.render('users/show');
    } catch (error) {
      console.log(error);
      res.redirect('/');  
    }
});

module.exports = router