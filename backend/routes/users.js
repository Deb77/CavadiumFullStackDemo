const router = require('express').Router();
let User = require('../models/user.model');

router.route('/')
.get((req,res) => {
    User.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error'));
})
.post((req,res) => {
    const name = req.body.name;
    const gender = req.body.gender;
    const email = req.body.email;
    const phone = Number(req.body.phone);
    const DOB = Date.parse(req.body.DOB);
    const age = Date().slice(11,15)-req.body.DOB.slice(0,4)
    const image = req.body.pass;
    console.log(req.body);
    const newUser = new User({
        name,
        gender,
        email,
        phone,
        DOB,
        age,
        image
    });

    newUser.save()
    .then(() => res.json('New User Added!'))
    .catch(err => res.status(400).json('Error'+err));
})

router.route('/search')
.post((req,res) => {
    const query = req.body.query;
    console.log(query);
    User.find({"name":query})
    .then(user => {
        res.json({user})
    })
    .catch(err => console.log(err))
})

router.route('/filter')
.post((req,res) => {
    const query = req.body;
    User.find({"age":query})
    .then(user => {
        res.json({user})
    })
    .catch(err => console.log(err));
})

module.exports = router;