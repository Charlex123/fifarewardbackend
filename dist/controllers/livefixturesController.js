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
const LiveFixtures = require("../models/livefixturesModel");
const axios = require("axios");
const Agenda = require("agenda");
const dotenv = require("dotenv");
dotenv.config();
const agenda = new Agenda({ db: { address: process.env.MONGO_URI, collection: 'agendaJobs' } });
process.env.TZ = 'Europe/London';
agenda.on('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Agenda connected to MongoDB and is ready');
    // Start Agenda
    yield agenda.start();
    // Schedule the job to run every 10 minutes
    yield agenda.every('15 minutes', 'clearAndRepopulateData');
})).on('error', (error) => {
    console.error('Agenda failed to connect:', error);
});
agenda.define('clearAndRepopulateData', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("huo ran live fixtures")
        // Clear existing data
        yield LiveFixtures.deleteMany({});
        // console.log("Existing fixtures cleared.");
        const config = {
            method: 'get',
            url: `https://v3.football.api-sports.io/fixtures?live=all&season=2024`,
            headers: {
                'x-rapidapi-key': process.env.API_SPORTS,
                'x-rapidapi-host': 'v3.football.api-sports.io'
            }
        };
        const response = yield axios(config);
        const fixturesresponse = response.data.response;
        // console.log("live fuix", fixturesresponse)
        // Repopulate data
        for (let i = 0; i < fixturesresponse.length; i++) {
            const fid = `${Math.floor(100000000 + Math.random() * 900000000)}`;
            const fixtureid = fixturesresponse[i].fixture.id;
            let fixdate = fixturesresponse[i].fixture.date;
            let fix_date = fixdate.split("T");
            const fixturesExists = yield LiveFixtures.findOne({ "fixture.id": fixtureid });
            if (fixturesExists) {
                // console.log('Fixture Exists', fixturesExists)
            }
            else {
                const liveFixture = yield LiveFixtures.create({
                    fid: fid,
                    fixturedate: fix_date[0],
                    fixture: fixturesresponse[i].fixture,
                    league: fixturesresponse[i].league,
                    teams: fixturesresponse[i].teams,
                    goals: fixturesresponse[i].goals,
                    score: fixturesresponse[i].score
                });
                if (liveFixture) {
                    // console.log('Live Fixture created successfully')
                }
            }
            // Add a delay here to wait before fetching the next data
            yield new Promise(resolve => setTimeout(resolve, 5000)); // Adjust the delay time as needed
        }
        console.log('Data cleared and repopulated successfully.');
        // Return the response data as JSON
        return {
            success: true,
            message: 'Data cleared and repopulated successfully.',
            data: fixturesresponse
        };
    }
    catch (error) {
        console.error('Error while clearing and repopulating data:', error);
        // Return error details
        return {
            success: false,
            message: 'Error occurred while clearing and repopulating data.',
            error: error.message
        };
    }
}));
// Start Agenda
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield agenda.start();
}))();
const loadliveFixtures = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.body.currentPage;
    const limit = req.body.limit;
    const livefixtures = yield LiveFixtures.aggregate([
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
    res.json({
        "leaguefixtures": livefixtures,
        totalPages: Math.ceil(livefixtures.length / limit),
        currentPage: page,
    });
}));
module.exports = { loadliveFixtures };
