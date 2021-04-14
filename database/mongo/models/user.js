const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { NotExtended } = require('http-errors');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'name can\'t be empty',
    },
    email: {
        type: String,
        required: 'email can\'t be empty',
        index: {
            unique: true,
        }
    },
    phone: {
        type: Number,
        required: 'phone can\'t be empty'
    },
    password: {
        type: String,
        required: 'password can\'t be empty',
        minlength: [4, 'Password must be atleast 4 character long']
    },
    date: {
        type: Date,
        default: Date.now,
    },
    saltSecret: String
});

// email vailidation
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid E-Mail');


// encrypt password
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});


// method for check login password match or not
userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

// method for generate jwt token
userSchema.methods.generateJwt = function () {

    return jwt.sign({ _id: this._id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXP
        });
}

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;
