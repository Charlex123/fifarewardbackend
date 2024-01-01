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
const generateToken = require("../utils/generateToken");
const generateRanNum = require("../utils/generateRanNum");
const generateUid = require("../utils/generateUid");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
console.log('fixtures ran');
(() => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    //     const leagues = await Leagues.find();
    //     if(leagues) {
    //         for(let l=0; l<leagues.length; l++) {
    //             const leagueid = leagues[l].league.id;
    //             var config = {
    //                 method: 'get',
    //                 url: `https://v3.football.api-sports.io/fixtures?league=${leagueid}&season=2023`,
    //                 headers: {
    //                   'x-rapidapi-key': process.env.API_SPORTS,
    //                   'x-rapidapi-host': 'v3.football.api-sports.io'
    //                 }
    //               };
    //               axios(config)
    //               .then(async function (response:any) {
    //                 let fixturesresponse:any = JSON.parse(JSON.stringify(response.data.response));
    //                 console.log('fixturesresponse.length',fixturesresponse.length)
    //                 if(fixturesresponse.length != 0) {
    //                     for(let i=0;i<fixturesresponse.length;i++) {
    //                         const fid = `${
    //                             Math.floor(100000000 + Math.random() * 900000000)
    //                         }`;
    //                         let fixtureid = fixturesresponse[i].fixture.id;
    //                         console.log('fixtureid',fixtureid)
    //                         const fixturesExists = await Fixtures.findOne({ "fixture.id":fixtureid });
    //                         if(fixturesExists) {
    //                             console.log('Fixture Exists',fixturesExists)
    //                         }else {
    //                             const Fixture = await Fixtures.create({
    //                                 fid: fid,
    //                                 fixture: fixturesresponse[i].fixture,
    //                                 league: fixturesresponse[i].league,
    //                                 teams: fixturesresponse[i].teams,
    //                                 goals: fixturesresponse[i].goals,
    //                                 score: fixturesresponse[i].score
    //                             });
    //                             if(Fixture) {
    //                                 // console.log('Fixture created successfully')
    //                             }
    //                         }
    //                     }
    //                 }else {
    //                 }
    //               })
    //               .catch(function (error:any) {
    //                 console.log(error);
    //               });
    //         }
    //     }
    //     }catch(error) 
    //     {
    // //   console.log(error)
    // }
}))();
const loadFixtures = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        "message": "successss"
    });
}));
module.exports = { loadFixtures };
