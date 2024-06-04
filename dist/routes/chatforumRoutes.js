"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const { getMessages } = require('../controllers/chatforumhttpController');
const router = express.Router();
router.get('/getmessages', getMessages);
module.exports = router;
