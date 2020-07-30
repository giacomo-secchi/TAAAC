const mongoose = require("mongoose");


let componentSchema = new mongoose.Schema({
    name: String,
    type: String
});


module.exports = componentSchema;
