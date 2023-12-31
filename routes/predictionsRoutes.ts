export {};
const predictionsRoute = require('express').Router();
const express = require("express");
const {
    getpredictions
} = require("../controllers/predictionsController.ts");
const router = express.Router();

router.get("/:predictions", getpredictions);

module.exports=predictionsRoute;