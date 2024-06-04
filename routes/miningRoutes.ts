export {};
const express = require("express");
const { Getminingdetails, StartMining, UpdateMiningAmount, StopMining  } = require("../controllers/miningController");
const router = express.Router();

router.post("/getminingdetails", Getminingdetails);
router.post("/startmining", StartMining);
router.post("/updateminedamount", UpdateMiningAmount);
router.post("/stopmining", StopMining);

module.exports = router;