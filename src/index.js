// Note that we do not assign a variable to the user import here, and we do not export anything from
// the User.js file.  This is because mongoose expects our code to run (mongoose.model('User', userSchema);)
// exactly one time.  If you import User.js to multiple files, this line will run multiple
// times which will cause an error since you have already defined a userSchema.  If we need a reference
// to the user model for other files, we can import/require mongoose, and then to get access to the user model we can
// const User = mongoose.model('User'); as in the authRoutes.js file.
require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = 'mongodb+srv://admin:Chinchulin1002@cluster0-crdes.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance')
});
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', err)
});

app.get('/', (req, res) => {
    res.send('Hi There!!!');
});

app.listen(3000, () => {
    console.log('Listening on port 3000')
});

