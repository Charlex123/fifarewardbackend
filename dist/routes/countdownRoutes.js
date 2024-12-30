"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { Getremainingtime } = require("../controllers/countdownController");
const router = express.Router();
router.get("/getremainingtime", Getremainingtime);
module.exports = router;
