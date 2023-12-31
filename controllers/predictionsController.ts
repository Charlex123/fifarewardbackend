export {};
const asyncHandler = require("express-async-handler");
const Fixtures = require("../models/fixturesModel.ts");
const Leagues = require("../models/leaguesModel");
const generateToken = require("../utils/generateToken.ts");
const generateRanNum = require("../utils/generateRanNum.ts");
const generateUid = require("../utils/generateUid.ts");
const axios = require("axios") 
const { v4: uuidv4 } = require("uuid");

(async () => {
    try {
        const leagues = await Leagues.find();
        if(leagues) {
            for(let l=0; l<leagues.length; l++) {
                const leagueid = leagues[l].league.id;
                var config = {
                    method: 'get',
                    url: `https://v3.football.api-sports.io/fixtures?league=${leagueid}&season=2023`,
                    headers: {
                      'x-rapidapi-key': process.env.API_SPORTS,
                      'x-rapidapi-host': 'v3.football.api-sports.io'
                    }
                  };
                  axios(config)
                  .then(async function (response:any) {
                    let fixturesresponse:any = JSON.parse(JSON.stringify(response.data.response));
                    if(fixturesresponse.length != 0) {
                        for(let i=0;i<fixturesresponse.length;i++) {
                        
                            const fid = `${
                                Math.floor(100000000 + Math.random() * 900000000)
                            }`;
                            let fixtureid = fixturesresponse[i].fixture.id;
                            console.log('fixtureid',fixtureid)
                            const fixturesExists = await Fixtures.findOne({ "fixture.id":fixtureid });
                            console.log('Fixture Exists',fixturesExists)
                            if(fixturesExists) {
                                console.log('Fixture Exists',fixturesExists)
                            }else {
                                const Fixture = await Fixtures.create({
                                    fid: fid,
                                    fixture: fixturesresponse[i].fixture,
                                    league: fixturesresponse[i].league,
                                    teams: fixturesresponse[i].teams,
                                    goals: fixturesresponse[i].goals,
                                    score: fixturesresponse[i].score
                                });
                                if(Fixture) {
                                    // console.log('Fixture created successfully')
                                }
                            }
                            
                        }
                    }else {

                    }
                    
                  })
                  .catch(function (error:any) {
                    console.log(error);
                  });
            }
        }

        }catch(error) 
        {
    //   console.log(error)
    }
})();

const loadFixtures = asyncHandler(async (req:any,res:any) => {
    console.log('hrer')    
  })
module.exports = { loadFixtures } 