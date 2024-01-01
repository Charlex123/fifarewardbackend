export {};
const express = require("express");
const {
  getLeauges
} = require("../controllers/leaguesController");
const router = express.Router();

router.get("/leagues", getLeauges);

module.exports=router;