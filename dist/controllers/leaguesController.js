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
const Leagues = require("../models/leaguesModel");
const axios = require('axios');
const Agenda = require("agenda");
const dotenv = require("dotenv");
dotenv.config();
process.env.TZ = 'Europe/London';
const agenda = new Agenda({ db: { address: process.env.MONGO_URI, collection: 'agendaJobs' } });
process.env.TZ = 'Europe/London';
agenda.on('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Agenda connected to MongoDB and is ready');
    // Start Agenda
    yield agenda.start();
    // Schedule the job to run every 10 minutes
    yield agenda.every('1440 minutes', 'LoadLeagues');
})).on('error', (error) => {
    console.error('Agenda failed to connect:', error);
});
// agenda.define('LoadLeagues', async () => {
//     try {
//       // await Leagues.deleteMany({});
//         const config = {
//             method: 'get',
//             url: `https://v3.football.api-sports.io/leagues?current=true&season=2024`,
//             headers: {
//                 'x-rapidapi-key': process.env.API_SPORTS,
//                 'x-rapidapi-host': 'v3.football.api-sports.io'
//             }
//         };
//         const response = await axios(config);
//         const leaguesresponse = response.data.response;
//         for (let i = 0; i < leaguesresponse.length; i++) {
//             const lid = `${
//                 Math.floor(100000000 + Math.random() * 900000000)
//             }`;
//             const leagueid = leaguesresponse[i].league.id;
//             const leagueExists = await Leagues.findOne({ "league.id": leagueid });
//             if (leagueExists) {
//                 // console.log('league Exists');
//             } else {
//                 const league = await Leagues.create({
//                     lid: lid,
//                     league: leaguesresponse[i].league,
//                     country: leaguesresponse[i].country,
//                     seasons: leaguesresponse[i].seasons
//                 });
//                 if (league) {
//                     // console.log("league created successfully", league);
//                 }
//             }
//         }
//         // Add a delay here to wait before fetching the next data
//         await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay time as needed
//     } catch (error) {
//         console.log(error);
//     }
// })
// // Start Agenda
// (async () => {
//   await agenda.start();
// })();
const getLeagues = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const leagues = yield Leagues.find();
    res.json({
        leagues: leagues
    });
}));
module.exports = { getLeagues };
