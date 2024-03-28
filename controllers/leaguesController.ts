export {};
const asyncHandler = require("express-async-handler");
const Leagues = require("../models/leaguesModel");
const axios = require('axios')

process.env.TZ = 'Europe/London';

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

const getLeagues = asyncHandler(async (req:any,res:any) => {
    const leagues = await Leagues.find();
    res.json({
      leagues: leagues
    })  
  })
module.exports = { getLeagues }  