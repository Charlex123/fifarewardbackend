export {};
const asyncHandler = require("express-async-handler");
const LiveFixtures = require("../models/livefixturesModel");
const axios = require("axios") 
const Agenda = require("agenda");
const dotenv = require("dotenv");
dotenv.config();


const agenda = new Agenda({ db: { address: process.env.MONGO_URI, collection: 'agendaJobs' } });
process.env.TZ = 'Europe/London';

agenda.on('ready', async () => {
    console.log('Agenda connected to MongoDB and is ready');

    // Start Agenda
    await agenda.start();

    // Schedule the job to run every 10 minutes
    await agenda.every('15 minutes', 'clearAndRepopulateData');
}).on('error', (error: any) => {
    console.error('Agenda failed to connect:', error);
});

agenda.define('clearAndRepopulateData', async () => {
    try {
        // console.log("huo ran live fixtures")
        // Clear existing data
        await LiveFixtures.deleteMany({});
        // console.log("Existing fixtures cleared.");

        const config = {
            method: 'get',
            url: `https://v3.football.api-sports.io/fixtures?live=all&season=2024`,
            headers: {
                'x-rapidapi-key': process.env.API_SPORTS,
                'x-rapidapi-host': 'v3.football.api-sports.io'
            }
        };
        const response = await axios(config);
        const fixturesresponse = response.data.response;
        // console.log("live fuix", fixturesresponse)
        // Repopulate data
        for (let i = 0; i < fixturesresponse.length; i++) {
            const fid = `${
                Math.floor(100000000 + Math.random() * 900000000)
            }`;
            const fixtureid = fixturesresponse[i].fixture.id;
            let fixdate = fixturesresponse[i].fixture.date;
            let fix_date = fixdate.split("T");
            const fixturesExists = await LiveFixtures.findOne({ "fixture.id": fixtureid });
            if (fixturesExists) {
                // console.log('Fixture Exists', fixturesExists)
            } else {
                const liveFixture = await LiveFixtures.create({
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
            await new Promise(resolve => setTimeout(resolve, 5000)); // Adjust the delay time as needed
        }
        console.log('Data cleared and repopulated successfully.');
        // Return the response data as JSON
        return {
            success: true,
            message: 'Data cleared and repopulated successfully.',
            data: fixturesresponse
        };
    } catch (error: any) {
        console.error('Error while clearing and repopulating data:', error);
        // Return error details
        return {
            success: false,
            message: 'Error occurred while clearing and repopulating data.',
            error: error.message
        };
    }
});

// Start Agenda
(async () => {
    await agenda.start();
})();

const loadliveFixtures = asyncHandler(async (req:any,res:any) => {

        const page = req.body.currentPage;
        const limit = req.body.limit;
            
        const livefixtures = await LiveFixtures.aggregate([
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
        ])

        res.json({
            "leaguefixtures":livefixtures,
            totalPages: Math.ceil(livefixtures.length / limit),
            currentPage: page,
        })
      
  })



module.exports = { loadliveFixtures } 