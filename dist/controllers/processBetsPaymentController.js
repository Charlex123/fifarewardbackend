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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const FRDBetting_json_1 = __importDefault(require("../utils/FRDBetting.json"));
const Agenda = require("agenda");
const dotenv = require("dotenv");
dotenv.config();
const axios_1 = __importDefault(require("axios"));
const FRDBettingFeatures_json_1 = __importDefault(require("../utils/FRDBettingFeatures.json"));
const agenda = new Agenda({ db: { address: process.env.MONGO_URI, collection: 'agendaJobs' } });
const Wprovider = new ethers_1.ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.bnbchain.org:8545");
const walletPrivKey = process.env.FRD_PRIVATE_KEY;
const BettingCA = process.env.FRD_BETTING_CA;
const BettingFeaturesCA = process.env.FRD_BETTING_FEATURES_CA;
let provider, signer;
agenda.on('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    // Start Agenda
    yield agenda.start();
    // Schedule the job to run every 10 minutes
    yield agenda.every('1 minutes', 'BetPaySys');
})).on('error', (error) => {
    console.error('Agenda failed to connect:', error);
});
// Main function to process bets
agenda.define('BetPaySys', () => __awaiter(void 0, void 0, void 0, function* () {
    provider = Wprovider;
    const wallet = new ethers_1.ethers.Wallet(walletPrivKey, provider);
    signer = provider.getSigner(wallet.address);
    if (signer) {
        try {
            const BetFeaturescontract = new ethers_1.ethers.Contract(BettingFeaturesCA, FRDBettingFeatures_json_1.default, signer);
            const Betcontract = new ethers_1.ethers.Contract(BettingCA, FRDBetting_json_1.default, signer);
            const loadBets = yield BetFeaturescontract.getBetsByStatus("open");
            for (let i = 0; i < loadBets.length; i++) {
                const matchId = loadBets[i].matchId; // Assuming matchId is of type BigNumber
                const tamount = loadBets[i].betamount;
                const betId = loadBets[i].betId;
                const config = {
                    headers: {
                        'x-rapidapi-key': process.env.API_SPORTS,
                        'x-rapidapi-host': 'v3.football.api-sports.io'
                    }
                };
                const response = yield axios_1.default.get(`https://v3.football.api-sports.io/fixtures?id=${matchId.toString()}`, config);
                const fixture = response.data.response;
                // console.log('agenda ooh 2 fixtures ran',fixture);
                for (let f = 0; f < fixture.length; f++) {
                    const matchstat = fixture[f].fixture.status.short;
                    const home = fixture[f].teams.home.name.trim();
                    const away = fixture[f].teams.away.name.trim();
                    const homeresult = fixture[f].teams.home.winner;
                    const awayresult = fixture[f].teams.home.winner;
                    const predictions = yield Betcontract.getPredictions(betId);
                    if (matchstat === "FT") {
                        let closebet = false;
                        let reslt;
                        for (let p = 0; p < predictions.length; p++) {
                            let prediction = predictions[p].prediction.trim();
                            let bettingteam = predictions[p].bettingteam.trim();
                            let totalbetamount = tamount * predictions.length;
                            let participants = predictions[p].participants;
                            let user = predictions[p].useraddress.trim();
                            let sharepercentage = 80;
                            let amount;
                            if (predictions.length == loadBets[i].participants.length) {
                                closebet = true;
                            }
                            else {
                                closebet = false;
                            }
                            if (homeresult == true) {
                                reslt = "Win";
                                amount = Math.ceil(totalbetamount * (sharepercentage / 100)) / (predictions.length);
                            }
                            if (homeresult == false) {
                                reslt = "Lose";
                                amount = Math.ceil(totalbetamount * (sharepercentage / 100)) / (predictions.length);
                            }
                            if (homeresult == null) {
                                reslt = "Null";
                                amount = Math.ceil(tamount * (2 / 100));
                            }
                            if (awayresult == true) {
                                reslt = "Win";
                                amount = Math.ceil(totalbetamount * (sharepercentage / 100)) / (predictions.length);
                            }
                            if (awayresult == false) {
                                reslt = "Lose";
                                amount = Math.ceil(totalbetamount * (sharepercentage / 100)) / (predictions.length);
                            }
                            if (awayresult == null) {
                                reslt = "Null";
                                amount = Math.ceil(tamount * (2 / 100));
                            }
                            const processbetpay = yield Betcontract.processBetPayments(betId, user, bettingteam.trim(), amount, closebet, reslt);
                            console.log(" procee  bets apaya ", processbetpay);
                            // if(bettingteam.trim() === home && prediction.trim() ===  reslt) {
                            //     await Betcontract.payWinner(betId, user, prediction.trim(), bettingteam.trim(), amount, closebet, reslt);
                            // }
                            // if(bettingteam.trim() === away && prediction.trim() === reslt) {
                            //     await Betcontract.payWinner(betId, user, prediction.trim(), bettingteam.trim(), amount, closebet, reslt);
                            // }
                            // if(bettingteam.trim() === away && prediction.trim() === reslt) {
                            //     await Betcontract.payWinner(betId, user, prediction.trim(), bettingteam.trim(), amount, closebet, reslt);
                            // }
                            // if(homeresult === null || awayresult === null) {
                            //     amount = Math.ceil(tamount * (2/100))
                            //     await Betcontract.refundBet(betId, user, amount, closebet, reslt);
                            // }else {
                            // }
                        }
                        // const processbet = await Betcontract.processMatchResults(matchId, string memory _result, string memory _bettingteam)
                    }
                    // if(matchstat === "FT") {
                    // console.log("ran ",)
                    // // const processbet = await Betcontract.processMatchResults(matchId, string memory _result, string memory _bettingteam)
                    // }
                }
            }
            // return betData;
        }
        catch (error) {
            throw new Error(`Failed to fetch bets: ${error.message}`);
        }
    }
}));
const checkPayment = () => __awaiter(void 0, void 0, void 0, function* () {
});
module.exports = { checkPayment };
