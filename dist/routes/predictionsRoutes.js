"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { loadPredictions } = require("../controllers/predictionsController");
const router = express.Router();
router.get("/predictions", loadPredictions);
module.exports = router;
