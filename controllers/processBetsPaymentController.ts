export {};
import { ethers } from 'ethers';
import { BigNumber } from 'ethers';
import BettingAbi from '../utils/FRDBetting.json';
const Agenda = require("agenda");
const dotenv = require("dotenv");
dotenv.config();
import axios from 'axios';
import BettingFeaturesAbi from '../utils/FRDBettingFeatures.json';

const agenda = new Agenda({ db: { address: process.env.MONGO_URI, collection: 'agendaJobs' } });

const Wprovider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.bnbchain.org:8545");
const  walletPrivKey: any = process.env.FRD_PRIVATE_KEY as any;
const BettingCA = process.env.FRD_BETTING_CA;
const BettingFeaturesCA = process.env.FRD_BETTING_FEATURES_CA;

let provider, signer;
agenda.on('ready', async () => {

    // Start Agenda
    await agenda.start();

    // Schedule the job to run every 10 minutes
    await agenda.every('1 minutes', 'BetPaySys');
}).on('error', (error: any) => {
    console.error('Agenda failed to connect:', error);
});

// Main function to process bets
agenda.define('BetPaySys', async () => {
    
    provider = Wprovider;
    const wallet = new ethers.Wallet(walletPrivKey, provider);
    signer = provider.getSigner(wallet.address);
    
        if (signer) {
        try {
            const BetFeaturescontract = new ethers.Contract(
            BettingFeaturesCA!,
            BettingFeaturesAbi,
            signer
            );

            const Betcontract = new ethers.Contract(
            BettingCA!,
            BettingAbi,
            signer
            );

            const loadBets = await BetFeaturescontract.getBetsByStatus("open");
            
            for(let i = 0; i < loadBets.length; i++) {
            const matchId: BigNumber = loadBets[i].matchId; // Assuming matchId is of type BigNumber
            
            const tamount = loadBets[i].betamount;
            
            const betId: BigNumber = loadBets[i].betId;
            const config = {
                headers: {
                'x-rapidapi-key': process.env.API_SPORTS,
                'x-rapidapi-host': 'v3.football.api-sports.io'
                }
            };
            
            const response = await axios.get(`https://v3.football.api-sports.io/fixtures?id=${matchId.toString()}`,config);
            const fixture = response.data.response;
            // console.log('agenda ooh 2 fixtures ran',fixture);
            for(let f = 0; f < fixture.length; f++) {
                
                const matchstat = fixture[f].fixture.status.short;
                const home = fixture[f].teams.home.name.trim();
                const away = fixture[f].teams.away.name.trim();
                const homeresult = fixture[f].teams.home.winner;
                const awayresult = fixture[f].teams.home.winner;
                
                const predictions = await Betcontract.getPredictions(betId);
                
                if(matchstat === "FT") {
                    let closebet = false;
                    let reslt;
                    for(let p = 0; p < predictions.length; p++) {
                        let prediction = predictions[p].prediction.trim();
                        let bettingteam = predictions[p].bettingteam.trim();
                        let totalbetamount = tamount * predictions.length;
                        let participants = predictions[p].participants;
                        let user = predictions[p].useraddress.trim();
                        let sharepercentage = 80;
                        let amount;
                        
                        
                        if(predictions.length == loadBets[i].participants.length) {
                            closebet = true;
                        }else {
                            closebet = false;
                        }
                        if(homeresult == true ) {
                            reslt = "Win";
                            amount = Math.ceil(totalbetamount * (sharepercentage/100))/(predictions.length);
                        }
                        if(homeresult == false ) {
                            reslt = "Lose";
                            amount = Math.ceil(totalbetamount * (sharepercentage/100))/(predictions.length);
                        }
                        if(homeresult == null ) {
                            reslt = "Null";
                            amount = Math.ceil(tamount * (2/100));
                        }
                        if(awayresult == true ) {
                            reslt = "Win";
                            amount = Math.ceil(totalbetamount * (sharepercentage/100))/(predictions.length);
                        }
                        if(awayresult == false ) {
                            reslt = "Lose";
                            amount = Math.ceil(totalbetamount * (sharepercentage/100))/(predictions.length);
                        }
                        if(awayresult == null ) {
                            reslt = "Null";
                            amount = Math.ceil(tamount * (2/100));
                        }

                        const processbetpay = await Betcontract.processBetPayments(betId, user, bettingteam.trim(), amount, closebet, reslt);
                        console.log(" procee  bets apaya ",processbetpay)
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
        } catch (error: any) {
            throw new Error(`Failed to fetch bets: ${error.message}`);
        }
    }
})



const checkPayment = async() => {

}

module.exports = { checkPayment}