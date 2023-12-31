export {};
const asyncHandler = require("express-async-handler");
const Leagues = require("../models/leaguesModel.ts");
const generateToken = require("../utils/generateToken.ts");
const generateRanNum = require("../utils/generateRanNum.ts");
const generateUid = require("../utils/generateUid.ts");
const { v4: uuidv4 } = require("uuid");
const axios = require('axios')



// try {
//   var config = {
//     method: 'get',
//     url: 'https://v3.football.api-sports.io/leagues',
//     headers: {
//       'x-rapidapi-key': process.env.API_SPORTS,
//       'x-rapidapi-host': 'v3.football.api-sports.io'
//     }
//   };
//   axios(config)
//   .then(async function (response:any) {
//     let leaguesresponse:any = JSON.parse(JSON.stringify(response.data.response));
//     for(let i=0;i<leaguesresponse.length;i++) {
//         const lid = `${
//             Math.floor(100000000 + Math.random() * 900000000)
//         }`;
//         let leagueid = leaguesresponse[i].league.id;
//         const leagueExists = await Leagues.findOne({ "league.id":leagueid });
//         if(leagueExists) {
//             // console.log('league Exists')
//         }else {
//             const league = await Leagues.create({
//                 lid: lid,
//                 league: leaguesresponse[i].league,
//                 country: leaguesresponse[i].country
//             });
//             if(league) {
//             }
//         }
        
//     }
//   })
//   .catch(function (error:any) {
//     console.log(error);
//   });
// }catch(error) 
// {
// console.log(error)
// }

const getLeauges = asyncHandler(async (req:any,res:any) => {
    console.log('hrer')    
  })
module.exports = { getLeauges }  