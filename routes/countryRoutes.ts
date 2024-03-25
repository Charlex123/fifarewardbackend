export {};
const express = require("express");
const { loadCountries } = require("../controllers/countryController");
const router = express.Router();

router.get("/loadcountries", loadCountries);

module.exports = router;