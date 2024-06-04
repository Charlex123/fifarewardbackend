"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = require('express-async-handler');
const Player = require('../models/playerModel');
const generateUid = require("../utils/generateUid");
const AddPlayerData = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, image, hint } = req.body;
    const player = yield Player.findOne({ name: name });
    if (!player || player == null) {
        const playerdata = new Player({ playerId: generateUid(), name: name, image: image, hint: hint });
        yield playerdata.save();
        res.status(200).json({ playerdata });
    }
    else {
        return res.json({ message: 'Player already added' });
    }
}));
const checkName = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const verifyname = yield Player.findOne({ name });
    if (verifyname) {
        verifyname.verified = true;
        res.json({
            message: name + " already exits, add another"
        });
    }
    else {
        res.json({
            message: name + " is ok"
        });
    }
}));
const UpdatePlayerData = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, image, hint } = req.body;
    const player = yield Player.findOne({ name: name });
    if (!player) {
        return res.json({ message: 'Player not found' });
    }
    player.image = image;
    player.hint = hint;
    const updatedplayer = yield Player.save();
    res.status(200).json({ updatedplayer });
}));
const GetGameData = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hreer");
    const gamedata = yield Player.aggregate([
        { $sample: { size: 9 } }
    ]);
    ;
    res.status(200).json({ gamedata });
}));
module.exports = { AddPlayerData, UpdatePlayerData, GetGameData, checkName };
