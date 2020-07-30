const mongoose = require('mongoose');
const Proj = mongoose.model('Project');
const helpers = require('../helpers');

let status = {
    ok: {
        code: 200,
        message: "succes"
    },
    notFound: {
        code: 404,
        message: "Not Found"
    }
}
module.exports.projectsList = (req, res) => {
    Proj.find((err, projects) => {
        if (err) {
            helpers.sendJSONResponse(res, 404, err);
        } else {
            helpers.sendJSONResponse(res, 200, projects);

        }
    });
};
module.exports.projectsCreate = (req, res) => {
    Proj.create({
        name: req.body.title,
    }, (err, project) => {
        if (err) {
            helpers.sendJSONResponse(res, 400, err);
        }
        else {
            helpers.sendJSONResponse(res, 201, project);
        }
    });
};

module.exports.projectsReadOne = (req, res) => {
    let projectid = req.params.projectid;
    if (req.params && projectid) {
        Proj.findById(req.params.projectid).exec((err, project) => {
            if (!project) {
                helpers.sendJSONResponse(res, 404, { "message": "projectid not found" });
                return;
            } else if (err) {
                helpers.sendJSONResponse(res, 404, err);
                return;
            }
            helpers.sendJSONResponse(res, 200, project);
        });
    } else {
        helpers.sendJSONResponse(res, 404, { "message": "No projectid in request" });
    }

};
module.exports.projectsUpdateOne = (req, res) => {
    Proj.findById(req.params.projectid).exec((err, project) => {
        project.title = req.body.title;
        project.save((err, project) => {
            if (err) {
                helpers.sendJSONResponse(res, 404, err);
            } else {
                helpers.sendJSONResponse(res, 200, project);
            }
        })
    });
};
module.exports.projectsDeleteOne = (req, res) => {
    let projectid = req.params.projectid;
    if (projectid) {
        Proj.findByIdAndRemove(projectid).exec((err, project) => {
            if (err) {
                helpers.sendJSONResponse(res, 404, err);
                return;
            }
            helpers.sendJSONResponse(res, 204, null);
        })
    } else {
        helpers.sendJSONResponse(res, 404, { "message": "No projectid" });
    }

};


