const express = require("express");
const router = express.Router();

const jwt = require('express-jwt')
    , projectsCtrl = require("../controllers/projects")
    , componentsCtrl = require("../controllers/components")
    , authenticationCtrl = require('../controllers/authentication');

let auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload' 
});

router.get("/projects", projectsCtrl.projectsList);
router.post("/projects", auth, projectsCtrl.projectsCreate);

router.get('/projects/:projectid', projectsCtrl.projectsReadOne);
router.put('/projects/:projectid', auth, projectsCtrl.projectsUpdateOne);
router.delete('/projects/:projectid', auth, projectsCtrl.projectsDeleteOne);

router.post('/projects/:projectid/components', auth, componentsCtrl.componentsCreate);
router.get('/projects/:projectid/components/:componentid', componentsCtrl.componentsReadOne);
router.put('/projects/:projectid/components/:componentid', auth, componentsCtrl.componentsUpdateOne);
router.delete('/projects/:projectid/components/:componentid', auth, componentsCtrl.componentsDeleteOne);

router.post("/login", authenticationCtrl.login);
router.post("/register", authenticationCtrl.register);



module.exports = router;
