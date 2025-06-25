const express = require('express');
const router = express.Router();
const Member = require('./models/members');
const Foodspot = require('./models/foodspots');

// eine GET-Anfrage
router.get('/fiw', async(req, res) => {

    res.send({ message: "Hello FIW!" });
});

// get all members
router.get('/members', async(req, res) => {
    const allMembers = await Member.find();
    console.log(allMembers);
    res.send(allMembers);
});

//get all foodspots
router.get('/foodspots', async(req, res) => {
    const allFoodspots = await Foodspot.find();
    console.log(allFoodspots);
    res.send(allFoodspots);
});

module.exports = router;