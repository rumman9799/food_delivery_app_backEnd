const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 
    fullname: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String
    }
});

const User = new mongoose.model('User', userSchema);
module.exports = User;