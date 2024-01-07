"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { loadFixtures, loadleagueFixtures } = require("../controllers/fixturesController");
const router = express.Router();
router.get("/loadfixtures", loadFixtures);
router.post("/loadleaguefixtures", loadleagueFixtures);
module.exports = router;
