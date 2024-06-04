export {};
var mongoose = require("mongoose");

const ChatForumMessageschema = mongoose.Schema(
    {
        address: { 
            type: String 
        },
        message: {
            type: String, required: true
        },
        likes: {
            type: Number
        },
        dislike: {
            type: Number
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
    }
);


const ChatForumMessages = mongoose.model("ChatForumMessages", ChatForumMessageschema);

module.exports = ChatForumMessages;
