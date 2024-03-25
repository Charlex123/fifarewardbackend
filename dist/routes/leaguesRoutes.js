"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { getLeagues } = require("../controllers/leaguesController");
const router = express.Router();
router.get("/leagues", getLeagues);
module.exports = router;
