export {};
const asyncHandler = require('express-async-handler');
const Message = require('../models/chatforumModel');
const User = require('../models/usersModel');
const generateUid = require("../utils/generateUid");

const sendMessage = asyncHandler(async (req: any, res: any) => {
  const { content, pic, user } = req.body;
  console.log(" req header ",req.body)
  try {
    // Check if the user exists
    const userExists = await User.findOne({address:user});
    if (!userExists) {
      return res.json({error: 'User not found'});
    }else {
      // Create a new message
      const messageDoc = new Message({
        chatid: generateUid(),
        address: user,
        pic: pic,
        message: content,
        timestamp: new Date(),
      });

      // Save the message to the database
      await messageDoc.save();
      // Broadcast the message to all connected clients
      console.log("mesage out o",messageDoc)
      res.json({message: messageDoc});
    }
    
  } catch (error) {
    console.error('Error saving message:', error);
    res.json({error:  'Error saving message'});
  }

});

const getMessages = asyncHandler(async (req: any, res: any) => {
  try {
    // const messages = await Message.find().populate('address', 'pic');
    const messages = await Message.find().sort({timestamp: 1});
    res.json({messages: messages});
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.json({error: 'Error fetching messages'});
  }
});

module.exports = { getMessages, sendMessage };
