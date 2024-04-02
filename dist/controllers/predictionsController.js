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
process.env.TZ = 'Europe/London';
(() => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    //   console.log('hopppppaweee')
    //     const fixtures = await Fixtures.find();
    //     if(fixtures) {
    //         for(let l=0; l<fixtures.length; l++) {
    //             const fixtureid = fixtures[l].fixture.id;
    //             var config = {
    //                 method: 'get',
    //                 url: `https://v3.football.api-sports.io/predictions?fixture=${fixtureid}`,
    //                 headers: {
    //                   'x-rapidapi-key': process.env.API_SPORTS,
    //                   'x-rapidapi-host': 'v3.football.api-sports.io'
    //                 }
    //               };
    //               axios(config)
    //               .then(async function (response:any) {
    //                 let predictionsresponse:any = JSON.parse(JSON.stringify(response.data.response));
    //                 console.log('predictionsresponse',predictionsresponse)
    //                 // if(predictionsresponse.length != 0) {
    //                 //     for(let i=0;i<predictionsresponse.length;i++) {
    //                 //         const fid = `${
    //                 //             Math.floor(100000000 + Math.random() * 900000000)
    //                 //         }`;
    //                 //         let predictionid = predictionsresponse[i].prediction.id;
    //                 //         console.log('predictionid',predictionid)
    //                 //         const fixturesExists = await Fixtures.findOne({ "fixture.id":fixtureid });
    //                 //         console.log('Fixture Exists',fixturesExists)
    //                 //         if(fixturesExists) {
    //                 //             console.log('Fixture Exists',fixturesExists)
    //                 //         }else {
    //                 //             const Fixture = await Fixtures.create({
    //                 //                 fid: fid,
    //                 //                 fixture: predictionsresponse[i].fixture,
    //                 //                 league: predictionsresponse[i].league,
    //                 //                 teams: predictionsresponse[i].teams,
    //                 //                 goals: predictionsresponse[i].goals,
    //                 //                 score: predictionsresponse[i].score
    //                 //             });
    //                 //             if(Fixture) {
    //                 //                 // console.log('Fixture created successfully')
    //                 //             }
    //                 //         }
    //                 //     }
    //                 // }else {
    //                 // }
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
const loadPredictions = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('hrer');
}));
module.exports = { loadPredictions };
