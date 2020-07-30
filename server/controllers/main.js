const express = require("express");

const homepageController = (req, res) => {
  res.statusMessage = "test";

  //res.setHeader('Content-Type', 'text/plain');
  //res.sendFile(path.join(__dirname, 'public', 'index.html'))
  res.render("index", {
    title: "Coming Sun Website",
    message: "test",
    websiteUrl: "www.mywebsite.com"
  });
};

const comingSoonPageController = (req, res) => {
  // https://webmasters.googleblog.com/2011/01/how-to-deal-with-planned-site-downtime.html
  res.status(503);
  res.statusMessage = "Service Temporarily Unavailable";

  //res.setHeader('Content-Type', 'text/plain');
  //res.sendFile(path.join(__dirname, 'public', 'index.html'))
  res.render("index", {
    title: "Coming Soon Website",
    message: "Farmacia Della bona - Sito in costruzione",
    websiteUrl: "www.mywebsite.com"
  });
};

const adminPageController = (req, res) => {
  res.statusMessage = "Admin Area";

  res.render("admin", {
    title: "Coming Soon Website",
    message: "Admin Area",
    websiteUrl: ""
  });
};

const comingSoonPageControllerFDB = (req, res) => {
  res.status(503);
  res.statusMessage = "Service Temporarily Unavailable";

  res.render("index", {
    title: "Coming Soon Website",
    message: "Farmacia Della bona - Sito in costruzione",
    websiteUrl: "www.farmaciadellabona.com"
  });
};



module.exports.index = (req, res) => res.render('index', { title: 'Express' });
module.exports.homepage = homepageController;
module.exports.adminPage = adminPageController;
module.exports.comingSoonPage = comingSoonPageController;
module.exports.comingSoonPageFDB = comingSoonPageControllerFDB;