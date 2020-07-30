const mongoose = require('mongoose');
const Proj = mongoose.model('Project');
const helpers = require('../helpers');


module.exports.componentsCreate = (req, res) => {
  helpers.getAuthor(req, res, (req, res,userName) => { 
        projectid = req.params.projectid;
        if (projectid) {
            Proj.findById(projectid)
                .select('components')
                .exec((err, project)=>{
                  if (err) {
                    helpers.sendJSONResponse(res, 400, err);
                  } else {
                    project.components.push({ 
                      name: req.body.name,
                      type: req.body.type
                    });                     
                    project.save((err, project) => {
                      
                      let thisComponent;
                      if (err) {
                        helpers.sendJSONResponse(res, 400, err);
                      } else {
                        
                        thisComponent = project.components[project.components.length - 1];
                        helpers.sendJSONResponse(res, 201, thisComponent);
                      }
                    });
                  }
                });
        } else {
            helpers.sendJSONResponse(res, 404, {"message": "Not found, projectid required"})
        }
    });
};



module.exports.componentsReadOne = (req, res) => {
  if (req.params && req.params.projectid && req.params.componentid) {
    Proj.findById(req.params.projectid)
        .select('name components')
        .exec((err, project) => {
          var response, component;
          if (!project) {
            helpers.sendJSONResponse(res, 404, {
              "message": "projectid not found"
            });
            return;
          } else if (err) {
            helpers.sendJSONResponse(res, 400, err);
            return; 
          }
          
          if (project.components && project.components.length > 0) {
            component = project.components.id(req.params.componentid);
            if (!component) {
              helpers.sendJSONResponse(res, 404, { "message": "componentid not found" });
            } else {
              response = {     
                project: {   
                  name: project.title,
                  id: req.params.projectid
                },  
                component: component
              };    
              helpers.sendJSONResponse(res, 200, response);
            }       
          } else {
            helpers.sendJSONResponse(res, 404, { "message": "No components found" });
          }
        });
  } else {
    helpers.sendJSONResponse(res, 404, {
      "message": "Not found, projectid and componentid are both required"
    }); 
  }
};
module.exports.componentsUpdateOne = (req, res) => {
  if (!req.params.projectid || !req.params.componentid) {
    helpers.sendJSONResponse(res, 404, { "message": "Not found, projectid and componentid are both required" });
    return;
  }
  Proj.findById(req.params.projectid)
    .select('components')
    .exec(
      (err, project) => {
        let thisComponent;
        if (!project) {
          helpers.sendJSONResponse(res, 404, { "message": "projectid not found"});
          return;
        } else if (err) {
          helpers.sendJSONResponse(res, 400, err);
          return;
        }

        if (project.components && project.components.length > 0) {
          thisComponent = project.components.id(req.params.componentid); 
          if (!thisComponent) {
            helpers.sendJSONResponse(res, 404, {"message": "compontenid not found" });
          } else {
            thisComponent.name = req.body.name; 
          }

          project.save((err, project) => {                     
            if (err) {
              helpers.sendJSONResponse(res, 404, err);
            } else {
              helpers.sendJSONResponse(res, 200, thisComponent);
            }
          });   
        } else {
          helpers.sendJSONResponse(res, 404, { "message" : "No component to update" });
        }
      });
};
module.exports.componentsDeleteOne = (req, res) => {
  if (!req.params.projectid || !req.params.componentid) {
    helpers.sendJSONResponse(res, 404, {
      "message": "Not found, projectid and componentid are both required"
    });
    return;
  }
  Proj
    .findById(req.params.projectid)
    .select('components')
    .exec(
      (err, project) => {
        if (!project) {
          helpers.sendJSONResponse(res, 404, {
            "message": "projectid not found"
          });
          return;
        } else if (err) {
          helpers.sendJSONResponse(res, 400, err);
          return;
        }
        if (project.components && project.components.length > 0) {
          if (!project.components.id(req.params.componentid)) {
            helpers.sendJSONResponse(res, 404, { "message": "componentid not found" });
          } else {
            project.components.id(req.params.componentid).remove();
            project.save(function(err) {
              if (err) {
                helpers.sendJSONResponse(res, 404, err);
              } else {
                helpers.sendJSONResponse(res, 204, null);
              }
            });
          }
        } else {
          helpers.sendJSONResponse(res, 404, { "message": "No component to delete" });
        }
      }
  );
};