const mongoose = require("mongoose");


let settingSchema = new mongoose.Schema({
    associatedDomain: String,
    projectType: String
});


module.exports = settingSchema;
