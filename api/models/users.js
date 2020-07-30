const mongoose = require("mongoose")
    , crypto = require("crypto")
    , jwt = require('jsonwebtoken');

let userSchema = new mongoose.Schema({
    name: { type: String },
    surname: { type: String },
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    hash: String,
    salt: String,
    createdOn: { type: Date, "default": Date.now }
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex'); // unique value renomly generated
    this.hash = crypto.pbkdf2Sync(password, this.salt, 100000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 100000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function() {

    
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        //exp: ,
    }, process.env.JWT_SECRET, { expiresIn: '7d' } ); // Need to fix to set correct exp time https://github.com/auth0/node-jsonwebtoken/issues/506
};

mongoose.model('User', userSchema);


