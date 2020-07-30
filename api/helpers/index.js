require("../models/users"); 
const mongoose = require('mongoose');
const User = mongoose.model('User');


module.exports = (function () {

	let sendJSON = (res, status, content) =>  {
		res.status(status);
        res.json(content);
    }

	let getAuthor = (req, res, callback) =>  {
        if (req.payload && req.payload.email) {
            User.findOne({ email : req.payload.email }).exec(function(err, user) {
                if (!user) {
                    sendJSON(res, 404, {
                        "message": "User not found"
                    });
                    return;
                } else if (err) {
                    sendJSON(res, 404, err);
                    return;
                }
                    callback(req, res, user.name);
            });
        } else {
            sendJSON(res, 404, {
                "message": "User not found"
            });
            return;
        }
	}

    return {
        sendJSONResponse: sendJSON,
        getAuthor: getAuthor
    };
})();