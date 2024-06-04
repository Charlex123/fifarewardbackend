export {};
var mongoose = require("mongoose");

const Playerschema = mongoose.Schema(
    {
        playerId: {
            type: Number, required: true
        },
        name: {
            type: String, required: true
        },
        image: {
            type: String, required: true
        },
        hint: {
            type: String, required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
    }
);


const Player = mongoose.model("Player", Playerschema);

module.exports = Player;
