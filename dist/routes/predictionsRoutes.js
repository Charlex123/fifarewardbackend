"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predictionsRoute = require('express').Router();
const express = require("express");
const { getpredictions } = require("../controllers/predictionsController");
const router = express.Router();
router.get("/:predictions", getpredictions);
module.exports = predictionsRoute;
