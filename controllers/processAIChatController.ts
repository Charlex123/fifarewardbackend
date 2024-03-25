export {};
const asyncHandler = require("express-async-handler");
const Fixtures = require("../models/fixturesModel");
const Leagues = require("../models/leaguesModel");
const generateToken = require("../utils/generateToken");
const generateRanNum = require("../utils/generateRanNum");
const generateUid = require("../utils/generateUid");
const axios = require("axios") 
const { v4: uuidv4 } = require("uuid");
const OpenAI= require('openai');
// Initialize OpenAI API
const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
  });
  
console.log('aichat ran');
(async () => {
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: "user", content: "Hello." }],
            model: 'gpt-4',
        });
        console.log('chat completion reaults',chatCompletion.choices[0])
        }catch(error) 
        {
    //   console.log(error)
    }
})();

const loadAiChat = asyncHandler(async (req:any,res:any) => {

  const prompt = req.body.message;

  try {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: "Hello." }],
        model: 'gpt-4.0-chat',
    });
    console.log('chat completion reaults',chatCompletion);
    res.json({
      "message": chatCompletion.choices[0]
    })
    }catch(error) 
    {
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
      
  })

 
module.exports = { loadAiChat } 