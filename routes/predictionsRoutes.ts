export {};
const express = require("express");
const {
    loadPredictions
} = require("../controllers/predictionsController");
const router = express.Router();

router.get("/predictions", loadPredictions);

module.exports=router;