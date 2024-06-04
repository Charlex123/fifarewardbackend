"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
const Miningschema = mongoose.Schema({
    miningId: {
        type: Number
    },
    address: {
        type: String
    },
    miningrate: {
        type: Number
    },
    miningstatus: {
        type: String
    },
    amountmined: {
        type: Number
    },
    date: {
        type: Date
    },
});
const Mining = mongoose.model("Mining", Miningschema);
module.exports = Mining;
