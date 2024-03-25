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
// async function loadLeagues() {
//     try {
//         let totalleagueIdCount = 1072;
//         for (let l = 0; l < totalleagueIdCount; l++) {
//             const config = {
//                 method: 'get',
//                 url: `https://v3.football.api-sports.io/leagues?id=${l}`,
//                 headers: {
//                     'x-rapidapi-key': process.env.API_SPORTS,
//                     'x-rapidapi-host': 'v3.football.api-sports.io'
//                 }
//             };
//             const response = await axios(config);
//             const leaguesresponse = response.data.response;
//             console.log('leagues', leaguesresponse);
//             for (let i = 0; i < leaguesresponse.length; i++) {
//                 const lid = `${
//                     Math.floor(100000000 + Math.random() * 900000000)
//                 }`;
//                 const leagueid = leaguesresponse[i].league.id;
//                 const leagueExists = await Leagues.findOne({ "league.id": leagueid });
//                 if (leagueExists) {
//                     console.log('league Exists');
//                 } else {
//                     const league = await Leagues.create({
//                         lid: lid,
//                         league: leaguesresponse[i].league,
//                         country: leaguesresponse[i].country,
//                         seasons: leaguesresponse[i].seasons
//                     });
//                     if (league) {
//                         console.log("league created successfully", league);
//                     }
//                 }
//             }
//             // Add a delay here to wait before fetching the next data
//             await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay time as needed
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }
// loadLeagues();
const getLeagues = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const leagues = yield Leagues.find();
    res.json({
        leagues: leagues
    });
}));
module.exports = { getLeagues };
