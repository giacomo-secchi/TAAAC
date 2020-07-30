const mongoose = require("mongoose");

var componentSchema = require('./projects/components');
var settingSchema = require('./projects/settings');

let projectSchema = new mongoose.Schema({
    title: { type: String, "default": "no title", required: true },
    components: [componentSchema],
    settings: [settingSchema],
});



mongoose.model('Project', projectSchema);
