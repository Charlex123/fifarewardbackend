export {};
const fixturesRoute = require('express').Router();
const express = require("express");
const {
    loadFixtures
} = require("../controllers/fixturesController.ts");
const router = express.Router();

router.get("/:fixtures", loadFixtures);

module.exports=fixturesRoute;