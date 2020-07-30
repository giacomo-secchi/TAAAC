const express = require("express");
const router = express.Router();
const mainCtrl = require("../controllers/main");

router.get("/*", mainCtrl.homepage); // fix router bug on landing https://tylermcginnis.com/react-router-cannot-get-url-refresh/
// router.get("/fdb", mainCtrl.comingSoonPageFDB);
// router.get("/admin", mainCtrl.adminPage);
// router.get("/*", mainCtrl.comingSoonPage);

module.exports = router;
