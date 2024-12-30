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
const CountDown = require("../models/countdownModel");
const dotenv = require("dotenv");
dotenv.config();
process.env.TZ = 'Europe/London';
// console.log("set count down page")
// const setCountDown = asyncHandler(async (req:any,res:any) => {
//     // Get the current time in seconds
//     const currentTimeInSeconds = Math.floor(Date.now() / 1000);
//     // Define the number of seconds in 60 days
//     const sixtyDaysInSeconds = 60 * 24 * 60 * 60;
//     // Add 60 days to the current time
//     const futureTimeInSeconds = currentTimeInSeconds + sixtyDaysInSeconds;
//     // Calculate the interval in seconds by subtracting the current time from the future time
//     const intervalInSeconds = futureTimeInSeconds - currentTimeInSeconds;
//     const setcountdown = await CountDown.create({
//         interval: futureTimeInSeconds,
//         timenow: currentTimeInSeconds,
//         remainingtime: intervalInSeconds
//       });
// await setcountdown.save()
//     if(setcountdown) {
//      console.log("countdown timer set success")   
//     }
//   })
//   setCountDown()
const Getremainingtime = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getcountdowntime = yield CountDown.findOne();
    if (getcountdowntime) {
        // Get the current time in seconds
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        // Define the number of seconds in 60 days
        const sixtdays = getcountdowntime.interval;
        // Calculate the interval in seconds by subtracting the current time from the future time
        const intervalInSeconds = sixtdays - currentTimeInSeconds;
        getcountdowntime.timenow = currentTimeInSeconds;
        getcountdowntime.remainingtime = intervalInSeconds;
        yield getcountdowntime.save();
        const getcountdown = yield CountDown.findOne();
        if (getcountdown) {
            res.status(201).json({
                _id: getcountdown._id,
                timenow: getcountdown.timenow,
                remainingtime: getcountdown.remainingtime
            });
        }
    }
}));
module.exports = { Getremainingtime };
