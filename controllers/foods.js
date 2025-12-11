const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
  const modUser = await User.findById(req.session.user._id);
  res.locals.pantry = modUser.pantry;      
  res.render('foods/index.ejs');
} catch (error) {
    console.log (error);
    res.redirect('/');
}
});

router.get('/new', async (req, res) => {
    try {
  res.render('foods/new.ejs');
} catch (error) {
    console.log (error);
    res.redirect('/');
}
});

router.post('/', async (req, res) => {
    try { 
        
const modUser = await User.findById(req.session.user._id);
modUser.pantry.push(req.body);
await modUser.save();

  res.redirect(`/users/${modUser._id}/foods`);
} catch (error) {
    console.log (error);
    res.redirect('/');
}
});

router.get('/:itemId/edit', async (req, res) => {
    try {

    const modUser = await User.findById(req.session.user._id);
    const food = modUser.pantry.id(req.params.itemId);
    
    res.locals.food = food;
    res.render('foods/edit');
} catch (error) {
    console.log('error');
    res.redirect('/');
  } 
});

router.put('/:itemId', async (req, res) => {
    try {

    const modUser = await User.findById(req.session.user._id)

    const food = modUser.pantry.id(req.params.itemId);

    food.set(req.body);
    await modUser.save();
    res.redirect(`/users/${modUser._id}/foods`);
} catch (error) {
    console.log(error);
    res.redirect('/');
 }
});

router.delete('/:itemId', async (req, res) => {
    try {
       
    const modUser = await User.findById(req.session.user._id);

    modUser.pantry.id(req.params.itemId).deleteOne();
    await modUser.save();

    res.redirect(`/users/${modUser._id}`);
} catch (error) {
    console.log(error);
    res.redirect('/');
    }
});


module.exports = router;
