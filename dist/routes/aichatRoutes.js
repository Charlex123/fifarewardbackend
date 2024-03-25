"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { loadAiChat } = require("../controllers/processAIChatController");
const router = express.Router();
router.get("/loadaichats", loadAiChat);
module.exports = router;
