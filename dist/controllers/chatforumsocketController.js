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
const mongoose = require('mongoose');
const Message = require('../models/chatforumModel');
const User = require('../models/usersModel');
const generateUid = require("../utils/generateUid");
/**
 * Setup message handlers for Socket.IO.
 *
 * @param {import('socket.io').Server} io - The Socket.IO server instance.
 * @param {import('socket.io').Socket} socket - The Socket.IO socket instance.
 */
const setupMessageHandlers = (io, socket) => {
    socket.on('sendMessage', (message) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Check if the user exists
            console.log("message in o", message);
            const userExists = yield User.findOne({ address: message.user });
            if (!userExists) {
                return socket.emit('error', 'User not found');
            }
            else {
                // Create a new message
                const messageDoc = new Message({
                    chatid: generateUid(),
                    address: message.user,
                    pic: message.pic,
                    message: message.content,
                    likes: message.likes,
                    dislike: message.dislike,
                    timestamp: new Date(),
                });
                // Save the message to the database
                yield messageDoc.save();
                // Broadcast the message to all connected clients
                console.log("mesage out o", messageDoc);
                io.emit('message', messageDoc);
            }
        }
        catch (error) {
            console.error('Error saving message:', error);
            socket.emit('error', 'Error saving message');
        }
    }));
    socket.on('getMessages', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // const messages = await Message.find().populate('address', 'pic');
            const messages = yield Message.find();
            socket.emit('messages', messages);
        }
        catch (error) {
            console.error('Error fetching messages:', error);
            socket.emit('error', 'Error fetching messages');
        }
    }));
};
module.exports = { setupMessageHandlers };
