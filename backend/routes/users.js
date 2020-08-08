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

    const newUser = new User({
        name,
        gender,
        email,
        phone,
        DOB
    });

    newUser.save()
    .then(() => res.json('New User Added!'))
    .catch(err => res.status(400).json('Error'+err));
})
module.exports = router;