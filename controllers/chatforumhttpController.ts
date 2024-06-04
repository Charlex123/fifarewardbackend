export {};
const asyncHandler = require('express-async-handler');
const Message = require('../models/chatforumModel');

// const sendMessage = asyncHandler(async (req: any, res: any) => {
//   const { userId, currentUser, content } = req.body;
//   const user = await User.findById(currentUser);
//   if (!user) {
//     return res.json({ message: 'User not found' });
//   }

//   const message = new Message({ sender: userId,user: new mongoose.Types.ObjectId(currentUser), message: content });
//   await message.save();

//   res.status(200).json({ message });
// });

const getMessages = asyncHandler(async (req: any, res: any) => {
  const messages = await Message.find().populate('sender', 'username').sort({ timestamp: -1 });
  res.status(200).json({ messages });
});

module.exports = { getMessages };
