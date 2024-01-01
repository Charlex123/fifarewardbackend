export {};
const express = require("express");
const {
    getpredictions
} = require("../controllers/predictionsController");
const router = express.Router();

router.get("/predictions", getpredictions);

module.exports=router;