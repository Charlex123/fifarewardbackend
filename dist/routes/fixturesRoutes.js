"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fixturesRoute = require('express').Router();
const express = require("express");
const { loadFixtures } = require("../controllers/fixturesController");
const router = express.Router();
router.get("/loadfixtures", loadFixtures);
module.exports = router;
