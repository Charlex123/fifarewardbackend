export {};
const express = require("express");
const {
  getLeagues
} = require("../controllers/leaguesController");
const router = express.Router();

router.get("/leagues", getLeagues);

module.exports=router;