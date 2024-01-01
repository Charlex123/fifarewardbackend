export {};
const express = require("express");
const { loadFixtures } = require("../controllers/fixturesController");
const router = express.Router();

router.get("/loadfixtures", loadFixtures);

module.exports = router;