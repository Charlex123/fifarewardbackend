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
const getMessages = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield Message.find().populate('sender', 'username').sort({ timestamp: -1 });
    res.status(200).json({ messages });
}));
module.exports = { getMessages };
