export {};
const asyncHandler = require('express-async-handler');
const GuessGame = require('../models/guessfootballheroModel');
const generateUid = require("../utils/generateUid");

const startGame = asyncHandler(async (req: any, res: any) => {
  const { 
    selectedName,
    selectedHint,
    amount,
    playedcount,
    remainingcount,
    totalCount,
    level,
    address,
    wincount
 } = req.body;
 const gamehint = {"playername":selectedName,"hint": selectedHint};
  try {
    const played = playedcount + 1;
    const remaining = remainingcount - 1;
    const game = new GuessGame({ gameId: generateUid(),played: played, level: level, address: address, gamehint:gamehint, amount: amount, total: totalCount, wins: wincount, remaining: remaining });
    await game.save();

    res.status(200).json({ game });

  } catch (error: any) {
    console.log("eroo r",error)
  }
  
});

const updateGame = asyncHandler(async (req: any, res: any) => {
    const { 
      gameId,
      playedcount,
      remainingcount,
      totalCount,
      level,
      address,
      wincount
   } = req.body;
    const game_ = await GuessGame.findOne({gameId : gameId});
    if (!game_) {
      return res.json({ message: 'Game not found' });
    }else {
      
      const getgame = await GuessGame.findOne({gameId: gameId});

      if(getgame) {
          const played = getgame.played;
          const rem = getgame.remaining;
          let remcount;
          let played_count;
          if(rem <= 32 && rem != 0 && played > 0 && played <= 32) {
            remcount = rem - 1;
            played_count = played + 1;
          }
          getgame.played = played_count;
          getgame.level = level;
          getgame.total = totalCount; 
          getgame.wins = wincount;
          getgame.address = address;
          getgame.remaining = remcount;
          const upgame = await getgame.save();
          if(upgame) {
              const getupgame = await GuessGame.findOne({gameId: gameId});
              if(getupgame) {
                  res.status(200).json({ getupgame });
              }
          }
      };
    }
    
  });

const updateWinsAndLevel = asyncHandler(async (req: any, res: any) => {
  const {gameId} = req.body;
  const game_ = await GuessGame.findOne({gameId : gameId});
  
    if (!game_) {
      return res.json({ message: 'Game not found' });
    }else {
      const getgame = await GuessGame.findOne({gameId: gameId});
      
      if(getgame) {
          const wins = getgame.wins + 1;
          const level = getgame.level + 1;
          getgame.wins = wins;
          getgame.level = level;
          const upgame = await getgame.save();
          if(upgame) {
              const getupgame = await GuessGame.findOne({gameId: gameId});
              if(getupgame) {
                  res.status(200).json({ getupgame });
              }
          }
      }
    }
})

const getGame = asyncHandler(async (req: any, res: any) => {
    const {gameId} = req.body;    
    const game = await GuessGame.findOne({gameId: gameId});
    res.status(200).json({ game });
});

const getuserGames = asyncHandler(async (req: any, res: any) => {
  const {address} = req.body;    
  const games = await GuessGame.find({remaining: { $lt: 32 },played: { $gt: 0 }, address: address}).sort({ timestamp: -1 });
  res.status(200).json({ games });
});

module.exports = { startGame, updateGame, getGame, getuserGames, updateWinsAndLevel };
