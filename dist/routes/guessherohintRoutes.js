"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const { addUpdateHint, getHint } = require('../controllers/guessherohintController');
const router = express.Router();
router.post('/addupdatehint', addUpdateHint);
router.post('/gethint', getHint);
module.exports = router;
