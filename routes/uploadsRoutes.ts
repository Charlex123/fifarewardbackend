export {};
const express = require('express');
const { forumuploadFile } = require('../controllers/chatforumuploadsController');
const { uploadPlayerImage } = require('../controllers/playerimageuploadController');
const { uploadProfileImage } = require('../controllers/profilepicuploadController');

const router = express.Router();

router.post('/uploadplayerimage', uploadPlayerImage);
router.post('/uploadforumfile', forumuploadFile);
router.post('/uploadprofileimage', uploadProfileImage);

module.exports = router;
