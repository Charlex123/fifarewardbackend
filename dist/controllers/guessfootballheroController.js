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
const GuessGame = require('../models/guessfootballheroModel');
const generateUid = require("../utils/generateUid");
const startGame = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { selectedName, selectedHint, amount, playedcount, remainingcount, totalCount, level, address, wincount } = req.body;
    const gamehint = { "playername": selectedName, "hint": selectedHint };
    try {
        const played = playedcount + 1;
        const remaining = remainingcount - 1;
        const game = new GuessGame({ gameId: generateUid(), played: played, level: level, address: address, gamehint: gamehint, amount: amount, total: totalCount, wins: wincount, remaining: remaining });
        yield game.save();
        res.status(200).json({ game });
    }
    catch (error) {
        console.log("eroo r", error);
    }
}));
const updateGame = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId, playedcount, remainingcount, totalCount, level, address, wincount } = req.body;
    const game_ = yield GuessGame.findOne({ gameId: gameId });
    if (!game_) {
        return res.json({ message: 'Game not found' });
    }
    else {
        const getgame = yield GuessGame.findOne({ gameId: gameId });
        if (getgame) {
            const played = getgame.played;
            const rem = getgame.remaining;
            let remcount;
            let played_count;
            if (rem <= 32 && rem != 0 && played > 0 && played <= 32) {
                remcount = rem - 1;
                played_count = played + 1;
            }
            getgame.played = played_count;
            getgame.level = level;
            getgame.total = totalCount;
            getgame.wins = wincount;
            getgame.address = address;
            getgame.remaining = remcount;
            const upgame = yield getgame.save();
            if (upgame) {
                const getupgame = yield GuessGame.findOne({ gameId: gameId });
                if (getupgame) {
                    res.status(200).json({ getupgame });
                }
            }
        }
        ;
    }
}));
const updateWinsAndLevel = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId } = req.body;
    const game_ = yield GuessGame.findOne({ gameId: gameId });
    if (!game_) {
        return res.json({ message: 'Game not found' });
    }
    else {
        const getgame = yield GuessGame.findOne({ gameId: gameId });
        if (getgame) {
            const wins = getgame.wins + 1;
            const level = getgame.level + 1;
            getgame.wins = wins;
            getgame.level = level;
            const upgame = yield getgame.save();
            if (upgame) {
                const getupgame = yield GuessGame.findOne({ gameId: gameId });
                if (getupgame) {
                    res.status(200).json({ getupgame });
                }
            }
        }
    }
}));
const getGame = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId } = req.body;
    const game = yield GuessGame.findOne({ gameId: gameId });
    res.status(200).json({ game });
}));
const getuserGames = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address } = req.body;
    const games = yield GuessGame.find({ remaining: { $lt: 32 }, played: { $gt: 0 }, address: address }).sort({ timestamp: -1 });
    res.status(200).json({ games });
}));
module.exports = { startGame, updateGame, getGame, getuserGames, updateWinsAndLevel };
