export {};
const asyncHandler = require('express-async-handler');
const Player = require('../models/playerModel');
const generateUid = require("../utils/generateUid");

const AddPlayerData = asyncHandler(async (req: any, res: any) => {
  const { name, image, hint } = req.body;
  const player = await Player.findOne({name: name});
  if (!player || player == null) {
    const playerdata = new Player({ playerId: generateUid(),name: name, image: image, hint: hint });
    await playerdata.save();
    res.status(200).json({ playerdata });
  }else {
    return res.json({ message: 'Player already added' });
    
  }

  
});

const checkName = asyncHandler(async (req:any,res:any) => {
  const {name} = req.body
  
  const verifyname = await Player.findOne({name});

  if (verifyname) {
    verifyname.verified = true;
      res.json({
        message: name + " already exits, add another"
      });
    } else {
      res.json({
        message: name + " is ok"
      });
    }
});

const UpdatePlayerData = asyncHandler(async (req: any, res: any) => {
    const { name, image, hint } = req.body;
    
    const player = await Player.findOne({name: name});
    if (!player) {
      return res.json({ message: 'Player not found' });
    }
    player.image = image;
    player.hint = hint;
    
    const updatedplayer = await Player.save();
  
    res.status(200).json({ updatedplayer });
  });

const GetGameData = asyncHandler(async (req: any, res: any) => {
  console.log("hreer")
  const gamedata = await Player.aggregate([
    { $sample: { size: 9 } }
]);;
  res.status(200).json({ gamedata });
});

module.exports = { AddPlayerData, UpdatePlayerData, GetGameData, checkName };
