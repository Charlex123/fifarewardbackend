export {};
const express = require('express');
const { getMessages, sendMessage } = require('../controllers/chatforumhttpController');

const router = express.Router();

router.get('/getmessages', getMessages);
router.post('/sendmessage', sendMessage);

module.exports = router;
