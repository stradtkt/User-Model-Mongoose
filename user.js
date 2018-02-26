const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//require your database

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40
    },
    email: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40
    },
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);
//find the user by id
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}
//find the user by username
module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username}
    User.findOne(query, callback);
}
//adding the user and hashing the password
module.exports.addUser = function(newUser, callback) {
    bcrypt.getSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}