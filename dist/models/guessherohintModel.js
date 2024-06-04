"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
const GuessHerohintschema = mongoose.Schema({
    address: {
        type: String
    },
    selectedName: {
        type: String, required: true
    },
    selectedImage: {
        type: String, required: true
    },
    selectedHint: {
        type: String, required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
});
const GuessHerohint = mongoose.model("GuessHerohint", GuessHerohintschema);
module.exports = GuessHerohint;
