export {};
const mongoose = require('mongoose');
const Message = require('../models/chatforumModel');
const User = require('../models/usersModel');

/**
 * Setup message handlers for Socket.IO.
 * 
 * @param {import('socket.io').Server} io - The Socket.IO server instance.
 * @param {import('socket.io').Socket} socket - The Socket.IO socket instance.
 */
const setupMessageHandlers = (io: any, socket: any) => {
    socket.on('sendMessage', async (message: any) => {
      try {
        // Check if the user exists
        const userExists = await User.findById(message.address);
        if (!userExists) {
          return socket.emit('error', 'User not found');
        }
  
        // Create a new message
        const messageDoc = new Message({
          chatid: message.chatid,
          address: message.address,
          message: message.message,
          likes: message.likes,
          dislike: message.dislike,
          timestamp: new Date(),
        });
  
        // Save the message to the database
        await messageDoc.save();
  
        // Broadcast the message to all connected clients
        io.emit('message', messageDoc);
      } catch (error) {
        console.error('Error saving message:', error);
        socket.emit('error', 'Error saving message');
      }
    });
  
    socket.on('getMessages', async () => {
      try {
        const messages = await Message.find().populate('address', 'profilePic');
        socket.emit('messages', messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
        socket.emit('error', 'Error fetching messages');
      }
    });
  };
  
  module.exports = { setupMessageHandlers };