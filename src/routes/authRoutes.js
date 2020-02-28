const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = new User({email, password});

        // The user.save() function call is an async function, since mongoose has to reach out to our
        // mongoDB database and initiate our save operation.  Also, when save is invoked, our validation
        // takes place and mongoDB will check for requirements depending on the settings of the user schema
        // in this instance we require both an email and password, and also require the email to be unique
        await user.save();
        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
        res.send({ token });
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

module.exports = router;
