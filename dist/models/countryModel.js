"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
const Countryschema = mongoose.Schema({
    cid: {
        type: Number
    },
    name: {
        type: String
    },
    code: {
        type: String
    },
    flag: {
        type: String
    }
});
const Country = mongoose.model("Country", Countryschema);
module.exports = Country;
