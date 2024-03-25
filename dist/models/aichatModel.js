"use strict";
var mongoose = require("mongoose");
const AIChatschema = mongoose.Schema({
    chatid: {
        type: Number
    },
    userId: {
        type: Number
    },
    gtpreply: {
        type: String
    },
    userquestion: {
        type: String,
    },
    image: {
        type: String
    },
    likes: {
        type: Number
    },
    dislike: {
        type: Number
    },
    date: {
        type: Date
    },
});
const AIChat = mongoose.model("AIChat", AIChatschema);
module.exports = AIChat;
