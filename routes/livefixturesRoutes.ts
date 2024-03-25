export {};
const express = require("express");
const { loadliveFixtures} = require("../controllers/livefixturesController");
const router = express.Router();

router.post("/loadlivefixtures", loadliveFixtures);

module.exports = router;