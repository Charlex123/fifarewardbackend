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
const Message = require('../models/chatforumModel');
const User = require('../models/usersModel');
const generateUid = require("../utils/generateUid");
const sendMessage = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, pic, user } = req.body;
    console.log(" req header ", req.body);
    try {
        // Check if the user exists
        const userExists = yield User.findOne({ address: user });
        if (!userExists) {
            return res.json({ error: 'User not found' });
        }
        else {
            // Create a new message
            const messageDoc = new Message({
                chatid: generateUid(),
                address: user,
                pic: pic,
                message: content,
                timestamp: new Date(),
            });
            // Save the message to the database
            yield messageDoc.save();
            // Broadcast the message to all connected clients
            console.log("mesage out o", messageDoc);
            res.json({ message: messageDoc });
        }
    }
    catch (error) {
        console.error('Error saving message:', error);
        res.json({ error: 'Error saving message' });
    }
}));
const getMessages = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const messages = await Message.find().populate('address', 'pic');
        const messages = yield Message.find().sort({ timestamp: 1 });
        res.json({ messages: messages });
    }
    catch (error) {
        console.error('Error fetching messages:', error);
        res.json({ error: 'Error fetching messages' });
    }
}));
module.exports = { getMessages, sendMessage };
