"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { loadCountries } = require("../controllers/countryController");
const router = express.Router();
router.get("/loadcountries", loadCountries);
module.exports = router;
