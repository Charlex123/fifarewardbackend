"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
const GuessFootBallHeroschema = mongoose.Schema({
    gameId: {
        type: Number, required: true
    },
    played: {
        type: Number, required: true
    },
    level: {
        type: Number
    },
    address: {
        type: String
    },
    gamehint: {
        playername: {
            type: String
        },
        hint: {
            type: String
        }
    },
    amount: {
        type: Number
    },
    total: {
        type: Number
    },
    wins: {
        type: Number
    },
    remaining: {
        type: Number
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
});
const GuessFootBallHero = mongoose.model("GuessFootBallHero", GuessFootBallHeroschema);
module.exports = GuessFootBallHero;
