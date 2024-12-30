"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
const Countdownschema = mongoose.Schema({
    interval: {
        type: Number
    },
    timenow: {
        type: Number
    },
    remainingtime: {
        type: Number
    }
});
const Countdown = mongoose.model("Countdown", Countdownschema);
module.exports = Countdown;
