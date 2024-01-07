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
const Country = require("../models/countryModel");
const axios = require('axios');
function countryLeagues() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const countries = yield Country.find();
            if (countries) {
                // for(let l=0; l<countries.length; l++) {
                //   const countryname = countries[l].name;
                //   console.log('countries name ooppppp',countryname)
                //   var config = {
                //     method: 'get',
                //     url: `https://v3.football.api-sports.io/leagues?country=${countryname}`,
                //     headers: {
                //       'x-rapidapi-key': process.env.API_SPORTS,
                //       'x-rapidapi-host': 'v3.football.api-sports.io'
                //     }
                //   };
                //   axios(config)
                //   .then(async function (response:any) {
                //     let leaguesresponse:any = JSON.parse(JSON.stringify(response.data.response));
                //     console.log('leagues',leaguesresponse)
                //     for(let i=0;i<leaguesresponse.length;i++) {
                //         const lid = `${
                //             Math.floor(100000000 + Math.random() * 900000000)
                //         }`;
                //         let leagueid = leaguesresponse[i].league.id;
                //         const leagueExists = await Leagues.findOne({ "league.id":leagueid });
                //         if(leagueExists) {
                //             console.log('league Exists')
                //         }else {
                //           const league = await Leagues.create({
                //               lid: lid,
                //               league: leaguesresponse[i].league,
                //               country: leaguesresponse[i].country
                //           });
                //           if(league) {
                //           }
                //         }
                //     }
                //   })
                //   .catch(function (error:any) {
                //     console.log(error);
                //   });
                // }
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
countryLeagues();
const getLeauges = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const leagues = yield Leagues.find();
    res.json({
        leagues: leagues
    });
}));
module.exports = { getLeauges };
