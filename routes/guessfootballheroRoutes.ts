export {};
const express = require('express');
const { startGame, updateGame, getGame, getuserGames, updateWinsAndLevel} = require('../controllers/guessfootballheroController');

const router = express.Router();

router.post('/startgame', startGame);
router.post('/updategame', updateGame);
router.post('/updatewinslevel', updateWinsAndLevel);
router.post('/getusergames', getuserGames);
router.post('/getgame', getGame);

module.exports = router;