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
const Country = require("../models/countryModel");
const axios = require("axios");
console.log('country ran');
// (async () => {
//     try {
//        var config = {
//         method: 'get',
//         url: `https://v3.football.api-sports.io/countries`,
//         headers: {
//             'x-rapidapi-key': process.env.API_SPORTS,
//             'x-rapidapi-host': 'v3.football.api-sports.io'
//         }
//         };
//         axios(config)
//         .then(async function (response:any) {
//         let countriesresponse:any = JSON.parse(JSON.stringify(response.data.response));
//         // console.log('countriesresponse.length',countriesresponse.length)
//         if(countriesresponse.length != 0) {
//             for(let i=0;i<countriesresponse.length;i++) {
//                 const cid = `${
//                     Math.floor(100000000 + Math.random() * 900000000)
//                 }`;
//                 const Countries = await Country.create({
//                     cid: cid,
//                     name: countriesresponse[i].name,
//                     code: countriesresponse[i].code,
//                     flag: countriesresponse[i].flag,
//                 });
//                 console.log(Countries)
//             }
//         }else {
//         }
//         })
//         .catch(function (error:any) {
//         console.log(error);
//         });
//         }catch(error) 
//         {
//       console.log(error)
//     }
// })();
const loadCountries = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('countriess');
}));
module.exports = { loadCountries };
