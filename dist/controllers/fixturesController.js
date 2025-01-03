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
const axios = require("axios");
const Agenda = require("agenda");
const dotenv = require("dotenv");
dotenv.config();
process.env.TZ = 'Europe/London';
// const agenda = new Agenda({ db: { address: process.env.MONGO_URI } });
// process.env.TZ = 'Europe/London';
// agenda.on('ready', async () => {
//   console.log('Agenda connected to MongoDB and is ready fixtures');
//   // Start Agenda
//   await agenda.start();
//   // Schedule the job to run every 10 minutes
//   await agenda.every('2 minutes', 'LoadFixtureData');
// }).on('error', (error: any) => {
//   console.error('Agenda failed to connect:', error);
// });
// console.log('fixtures ran');
// const LoadFixtureData = async () => {
//   console.log('agenda fixtures ran');
//     try {
//         // Clear existing data
//         // await Fixtures.deleteMany({});
//         // console.log("Existing fixtures cleared.");
//       const config = {
//         headers: {
//           'x-rapidapi-key': process.env.API_SPORTS,
//           'x-rapidapi-host': 'v3.football.api-sports.io'
//         }
//       };
//       // console.log('agenda ooh 2 fixtures ran');
//       const response = await axios.get(`https://v3.football.api-sports.io/leagues?current=true&season=2024`,config);
//       // console.log("fix ureee resp",response)
//       const leagues = response.data.response;
//       // console.log("fix ureee resp legue",leagues)
//         if(leagues) {
//             for(let l=0; l<leagues.length; l++) {
//                 const leagueid = leagues[l].league.id;
//                 // console.log("league ooo puytr",leagueid);
//                   const response = await axios.get(`https://v3.football.api-sports.io/fixtures?league=${leagueid}&season=2024`,config);
//                   const fixturesresponse = response.data.response;
//                   // console.log('fixturesresponse.length',fixturesresponse.length, fixturesresponse, response)
//                   if(fixturesresponse.length != 0) {
//                       for(let i=0;i<fixturesresponse.length;i++) {
//                           const fid = `${
//                               Math.floor(100000000 + Math.random() * 900000000)
//                           }`;
//                           let fixtureid = fixturesresponse[i].fixture.id;
//                           let fixdate = fixturesresponse[i].fixture.date;
//                           let fix_date = fixdate.split("T");
//                           // console.log('fixtureid',fixtureid);
//                           const fixturesExists = await Fixtures.findOne({"fixture.id":fixtureid});
//                           if(fixturesExists) {
//                               // console.log('Fixture Exists');
//                           }else {
//                             // console.log('Fixture created successfully__ ',fixtureid)
//                               const Fixture = await Fixtures.create({
//                                   fid: fid,
//                                   fixturedate: fix_date[0],
//                                   fixture: fixturesresponse[i].fixture,
//                                   league: fixturesresponse[i].league,
//                                   teams: fixturesresponse[i].teams,
//                                   goals: fixturesresponse[i].goals,
//                                   score: fixturesresponse[i].score,
//                               });
//                               if(Fixture) {
//                                   console.log('Fixture created successfully',Fixture)
//                               }
//                           }
//                       }
//                   }else {
//                   }
//                   // await new Promise(resolve => setTimeout(resolve, 5000)); // Adjust the delay time as needed
//             }
//         }
//         }catch(error) 
//         {
//     //   console.log(error)
//     }
// };
// LoadFixtureData()
// // Start Agenda
// (async () => {
//   await agenda.start();
// })();
const loadFixtures = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const page = parseInt(req.query.page) || 1;
    // const pageSize = 200;
    // const skip = (page - 1) * pageSize;
    // const fixtures = await Fixtures.aggregate([
    //   {
    //     // Group fixtures by league ID
    //     $group: {
    //       _id: "$league.id",
    //       leagueName: { $first: "$league.name" },
    //       country: { $first: "$league.country" },
    //       fixtures: { $push: "$$ROOT" } // Pushing the entire document into fixtures array
    //     }
    //   },
    //   {
    //     // Group leagues by country
    //     $group: {
    //       _id: "$country",
    //       leagues: {
    //         $push: {
    //           leagueId: "$_id",
    //           leagueName: "$leagueName",
    //           fixtures: "$fixtures"
    //         }
    //       }
    //     }
    //   },
    //   {
    //     // Optionally, you can sort the results by country name
    //     $sort: { _id: 1 },
    //   },{$limit: 1},
    // ]);
    const fixtures = yield Fixtures.aggregate([
        {
            $match: {
                'fixture.status.short': { $nin: ['FT', 'NS'] } // Exclude matches with status 'FT' (played) and 'NS' (not started)
            }
        },
        {
            $group: {
                _id: { country: "$league.country", league: "$league.name", leagueid: "$league.id" },
                totalFixtures: { $sum: 1 }
            }
        },
        {
            $group: {
                _id: "$_id.country",
                leagues: {
                    $push: {
                        leagueId: "$_id.leagueid",
                        leagueName: "$_id.league",
                        totalFixtures: "$totalFixtures"
                    }
                },
                totalFixturesInCountry: { $sum: "$totalFixtures" }
            }
        },
        { $sort: { _id: 1 } }
    ]);
    res.json({
        "fixtures": fixtures,
        "length": fixtures.length
    });
}));
const loadCupFixtures = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const statuses = ['NS', '1H', 'HT', '2H', 'ET', 'BT', 'P', 'SUSP', 'INT'];
    const fixtures = yield Fixtures.aggregate([
        {
            $match: {
                'fixture.status.short': { $in: statuses },
                'league.season': 2024
            } // Filter documents where league.country is 'World'
        },
        {
            $group: {
                _id: '$league.id', // Group by league id
                league: { $first: '$league' }, // Get the league details
                count: { $sum: 1 } // Count the number of fixtures in each league
            }
        },
        {
            $project: {
                _id: 0, // Exclude the default _id field
                league: 1, // Include league details
                count: 1 // Include fixture count
            }
        },
        { $sort: { _id: 1 } }
    ]);
    res.json({
        "fixtures": fixtures,
        "length": fixtures.length
    });
}));
const loadleagueFixtures = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const leagueId = req.body.leagueid;
    const page = req.body.currentPage;
    const limit = req.body.limit;
    const leaguefixtures = yield Fixtures.aggregate([
        {
            $match: {
                'league.id': leagueId,
                'fixture.status.short': { $nin: ['FT', 'NS'] } // Exclude matches with status 'FT' (played) and 'NS' (not started)
            }
        },
        {
            $group: {
                _id: '$league.id',
                leagueName: { $first: '$league.name' },
                leagueCountry: { $first: '$league.country' },
                fixtures: { $push: '$$ROOT' }
            }
        },
        { $unwind: '$fixtures' },
        { $sort: { 'fixtures.fixture.date': 1 } }, // Sorting by date for example
        { $skip: (page - 1) * limit },
        { $limit: limit },
        {
            $group: {
                _id: '$_id',
                leagueName: { $first: '$leagueName' },
                leagueCountry: { $first: '$leagueCountry' },
                fixtures: { $push: '$fixtures' },
                total: { $sum: 1 } // Count the total number of fixtures in the league
            }
        }
    ]);
    const count = yield Fixtures.find({ "league.id": leagueId });
    res.json({
        "leaguefixtures": leaguefixtures,
        totalPages: Math.ceil(count.length / limit),
        currentPage: page,
    });
}));
const loadFixturesByDate = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fixturedate = req.body.fixturedate;
    console.log("fix ture date", fixturedate);
    const page = req.body.currentPage;
    const limit = req.body.limit;
    const fixturesbydate = yield Fixtures.aggregate([
        { $match: { 'fixturedate': fixturedate } },
        {
            $group: {
                _id: '$league.id',
                leagueName: { $first: '$league.name' },
                leagueCountry: { $first: '$league.country' },
                fixtures: { $push: '$$ROOT' }
            }
        },
        { $unwind: '$fixtures' },
        { $sort: { 'fixtures.date': 1 } }, // Sorting by date for example
        { $skip: (page - 1) * limit },
        { $limit: limit },
        {
            $group: {
                _id: '$_id',
                leagueName: { $first: '$leagueName' },
                leagueCountry: { $first: '$leagueCountry' },
                fixtures: { $push: '$fixtures' }
            }
        }
    ]);
    // const count = await Fixtures.find({"league.id":leagueId});
    console.log("fixtures by date result", fixturesbydate);
    res.json({
        "leaguefixtures": fixturesbydate,
        totalPages: Math.ceil(fixturesbydate.length / limit),
        currentPage: page,
    });
}));
const loadTodaysFixtures = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fixturedate = req.body.todaysdate;
    console.log("today's fixture", fixturedate);
    const page = req.body.currentPage;
    const limit = req.body.limit;
    const todaysfixtures = yield Fixtures.aggregate([
        { $match: { 'fixturedate': fixturedate } },
        {
            $group: {
                _id: '$league.id',
                leagueName: { $first: '$league.name' },
                leagueCountry: { $first: '$league.country' },
                fixtures: { $push: '$$ROOT' }
            }
        },
        { $unwind: '$fixtures' },
        { $sort: { 'fixtures.fixture.date': 1 } }, // Sorting by fixture date
        { $skip: (page - 1) * limit },
        { $limit: limit },
        {
            $group: {
                _id: '$_id',
                leagueName: { $first: '$leagueName' },
                leagueCountry: { $first: '$leagueCountry' },
                fixtures: { $push: '$fixtures' }
            }
        }
    ]);
    // const count = await Fixtures.find({"league.id":leagueId});
    console.log("today's fixtures result", todaysfixtures);
    res.json({
        "leaguefixtures": todaysfixtures,
        totalPages: Math.ceil(todaysfixtures.length / limit),
        currentPage: page,
    });
}));
const searchFixturesResults = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchkeyword = req.body.searchkeyword;
    const page = req.body.currentPage;
    const limit = req.body.limit;
    const leaguefixtures = yield Fixtures.aggregate([
        {
            $match: {
                $or: [
                    { 'league.name': { $regex: searchkeyword, $options: 'i' } },
                    { 'league.country': { $regex: searchkeyword, $options: 'i' } }
                ]
            }
        },
        {
            $group: {
                _id: '$league.id',
                leagueName: { $first: '$league.name' },
                leagueCountry: { $first: '$league.country' },
                fixtures: { $push: '$$ROOT' }
            }
        },
        { $unwind: '$fixtures' },
        { $sort: { 'fixtures.date': 1 } }, // Sorting by date for example
        { $skip: (page - 1) * limit },
        { $limit: limit },
        {
            $group: {
                _id: '$_id',
                leagueName: { $first: '$leagueName' },
                leagueCountry: { $first: '$leagueCountry' },
                fixtures: { $push: '$fixtures' }
            }
        }
    ]);
    const count = yield Fixtures.find({ $or: [
            { "league.name": searchkeyword ? { $regex: new RegExp(`^${searchkeyword}`, 'i') } : { $exists: true } },
            { "league.country": searchkeyword ? { $regex: new RegExp(`^${searchkeyword}`, 'i') } : { $exists: true } },
        ] });
    res.json({
        "leaguefixtures": leaguefixtures,
        totalPages: Math.ceil(count.length / limit),
        currentPage: page,
    });
}));
const loadMatchFixture = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const matchId = req.body.matchidparam;
    const leaguefixtures = yield Fixtures.findOne({ "fixture.id": matchId });
    res.json({
        "match": leaguefixtures
    });
}));
const loadMatchSearchResult = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hometeam = req.body.hometeam;
    const awayteam = req.body.awayteam;
    const leaguefixtures = yield Fixtures.findOne({ "teams.home.name": hometeam, "teams.away.name": awayteam });
    res.json({
        "match": leaguefixtures
    });
}));
const searchFixturesbyKeyWords = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchKeyword = req.body.searchkeyword;
    try {
        const keywordResult = yield Fixtures.aggregate([{
                $match: {
                    $or: [
                        { "league.name": searchKeyword ? { $regex: new RegExp(`^${searchKeyword}`, 'i') } : { $exists: true } },
                        { "league.country": searchKeyword ? { $regex: new RegExp(`^${searchKeyword}`, 'i') } : { $exists: true } },
                    ]
                }
            },
            {
                $project: {
                    match: 1,
                    "league.name": 1,
                    "league.country": 1,
                }
            },
            { $limit: 20 }
        ]);
        res.json({
            keywordResult
        });
    }
    catch (error) {
        console.log('kyword search error', error);
    }
}));
const searchMatchbyKeyWords = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchKeyword = req.body.searchkeyword;
    try {
        const keywordResult = yield Fixtures.aggregate([{
                $match: {
                    $or: [
                        { "teams.home.name": searchKeyword ? { $regex: new RegExp(`^${searchKeyword}`, 'i') } : { $exists: true } },
                        { "teams.away.name": searchKeyword ? { $regex: new RegExp(`^${searchKeyword}`, 'i') } : { $exists: true } },
                    ]
                }
            },
            {
                $project: {
                    match: 1,
                    "teams.home.name": 1,
                    "teams.away.name": 1,
                }
            },
            { $limit: 20 }
        ]);
        res.json({
            keywordResult
        });
    }
    catch (error) {
        console.log('kyword search error', error);
    }
}));
const searchFixtureByMatchId = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const matchId = req.body.matchidparam;
    const leaguefixtures = yield Fixtures.findOne({ "fixture.id": matchId });
    res.json({
        "match": leaguefixtures
    });
}));
const searchFixtureByTeam = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const matchId = req.body.matchidparam;
    const leaguefixtures = yield Fixtures.findOne({ "fixture.id": matchId });
    res.json({
        "match": leaguefixtures
    });
}));
module.exports = { loadCupFixtures, loadFixtures, loadleagueFixtures, loadTodaysFixtures, loadFixturesByDate, loadMatchFixture, searchFixtureByMatchId, searchFixtureByTeam, searchFixturesbyKeyWords, searchFixturesResults, searchMatchbyKeyWords, loadMatchSearchResult };
