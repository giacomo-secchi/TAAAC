const mongoose = require('mongoose')
    , passport = require('passport')
    , helpers = require('../helpers');


const User = mongoose.model('User');



module.exports.register = (req, res) => { 
    if(!req.body.username || !req.body.password) {

        helpers.sendJSONResponse(res, 400, { 
            "message": "All fields required"
          });
        return;
    }  

    let user = new User();                                  
    user.name = req.body.name;
    user.surname = req.body.surname;
    user.username = req.body.username;                              
    user.email = req.body.email; 

    user.setPassword(req.body.password);                         
    user.save((err) => {
         
        let token;
        if (err) {
            helpers.sendJSONResponse(res, 404, err);
        } else {
          token = user.generateJwt();
          helpers.sendJSONResponse(res, 200, { "token" : token });
        } 
    });
};

module.exports.login = (req, res, next) => {
    if(!req.body.username || !req.body.password) {
        helpers.sendJSONResponse(res, 400, {
          "message": "All fields required"
        });                         
        return;                     
    }
    passport.authenticate('local', (err, user, info) => {
        let token;

        if (err) {
            helpers.sendJSONResponse(res, 404, err);
            return;
        } 
        
        if (user) {
            token = user.generateJwt();
            helpers.sendJSONResponse(res, 200, {
                "token" : token
            });
        } else {
            helpers.sendJSONResponse(res, 401, info)
        }
    })(req, res, next);
};
 