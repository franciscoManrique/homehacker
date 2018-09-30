const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: 'The name is required'
    },
    lastname: {
        type: String,
        required: 'The lastname is required'
    },
    email: {
        type: String,
        required: 'The email is required',
        unique: 'This email already exists',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: 'The password is required'
    },
    // houses:{
    //     type: 
    // }
});

const User = mongoose.model('User', userSchema);

module.exports = User;