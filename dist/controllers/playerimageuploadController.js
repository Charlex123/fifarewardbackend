"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = require('express-async-handler');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join(__dirname, '../playerimages');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
    }
});
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.minetype === "image/webp" || file.minetype === "image/gif" || file.minetype === "image/jpg") {
            cb(null, true);
        }
        else {
            cb(new Error('Only .jpeg and .png files are allowed!'), false);
        }
    }
}).single('file');
const uploadPlayerImage = asyncHandler((req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.json({ error: err.message });
        }
        if (req.file) {
            const protocol = req.protocol === 'http' ? 'https' : req.protocol;
            const baseUrl = `${protocol}://${req.get('host')}`;
            const filePath = `/playerimages/${req.file.filename}`;
            const fullUrl = `${baseUrl}${filePath}`;
            res.json({ fullUrl });
        }
        else {
            res.json({ error: 'Failed to upload the file' });
        }
    });
});
module.exports = { uploadPlayerImage };
