"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = require('express-async-handler');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join(__dirname, '../profile-images');
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
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp' || file.mimetype === 'image/jpg' || file.mimetype === 'image/gif') {
            cb(null, true);
        }
        else {
            cb(new Error('Only .jpeg and .png files are allowed!'), false);
        }
    }
}).single('file');
const uploadProfileImage = asyncHandler((req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.json({ error: err.message });
        }
        if (req.file) {
            const baseUrl = `${req.protocol}://${req.get('host')}`;
            const filePath = `/profile-images/${req.file.filename}`;
            const fullUrl = `${baseUrl}${filePath}`;
            res.json({ fullUrl });
        }
        else {
            res.json({ error: 'Failed to upload the file' });
        }
    });
});
module.exports = { uploadProfileImage };
