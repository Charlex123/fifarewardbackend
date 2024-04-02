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
const asyncHandler = require("express-async-handler");
const Fixtures = require("../models/fixturesModel");
const Leagues = require("../models/leaguesModel");
const generateToken = require("../utils/generateToken");
const generateRanNum = require("../utils/generateRanNum");
const generateUid = require("../utils/generateUid");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const OpenAI = require('openai');
// Initialize OpenAI API
const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});
process.env.TZ = 'Europe/London';
console.log('aichat ran');
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chatCompletion = yield openai.chat.completions.create({
            messages: [{ role: "user", content: "Hello." }],
            model: 'gpt-4',
        });
        console.log('chat completion reaults', chatCompletion.choices[0]);
    }
    catch (error) {
        //   console.log(error)
    }
}))();
const loadAiChat = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prompt = req.body.message;
    try {
        const chatCompletion = yield openai.chat.completions.create({
            messages: [{ role: "user", content: "Hello." }],
            model: 'gpt-4.0-chat',
        });
        console.log('chat completion reaults', chatCompletion);
        res.json({
            "message": chatCompletion.choices[0]
        });
    }
    catch (error) {
        //   console.log(error)
    }
    // try {
    //   const response = await openai.createImage({
    //     prompt: prompt,
    //     n: 1,
    //     size: "1024x1024"
    //   });
    //   return response.data;
    // } catch (error) {
    //   console.error("Error generating image:", error);
    //   return null;
    // }
}));
module.exports = { loadAiChat };
