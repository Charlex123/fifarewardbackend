"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { checkPayment } = require("../controllers/processBetsPaymentController");
const router = express.Router();
router.get("/checkpayment", checkPayment);
module.exports = router;
