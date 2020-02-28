const mongoose = require('mongoose');

// The schema object is how we tell mongoose about the different properties each user in our collection will have
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// This command associates the userSchema with our mongoose library
mongoose.model('User', userSchema);
