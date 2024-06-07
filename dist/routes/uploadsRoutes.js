"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const { upload, uploadFile } = require('../controllers/uploadController');
const router = express.Router();
router.post('/upload', upload.single('file'), uploadFile);
module.exports = router;
