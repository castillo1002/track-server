const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

// Inside this middleware, if we detect that the user has a validated token, it will
// perform the code in next
module.exports = (req, res, next) => {

    // This line deconstructs the authorization header sent from
    // the user.  Note that authorization is lower cased by express
    const { authorization } = req.headers;

    // If the user does NOT have a valid JWT token, we return an error message
    // along with a 401 code that indicates a forbidden error
    if (!authorization) {
        return res.status(401).send({error: 'You must be logged in.'})
    }

    // Note that authorization coming from our client will be in the following
    // format: 'Bearer 2lk34tokenl2k5lkjl34' so we need to parse out the token only
    // here we use replace to delete Bearer and the space:
    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
        if (err) {
            return res.status(401).send({ error: 'You must be logged in' })
        }

        const { userId } = payload;

        const user = await User.findById(userId);
        req.user = user;
        next();
    })
};
