export {};
const express = require('express');
const { AddPlayerData, UpdatePlayerData, checkName, GetGameData } = require('../controllers/playerController');

const router = express.Router();

router.post('/checkname', checkName);
router.post('/addplayer', AddPlayerData);
router.post('/updateplayer', UpdatePlayerData);
router.get('/getgamedata', GetGameData);

module.exports = router;
