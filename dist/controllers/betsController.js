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
const Bets = require("../models/betsModel");
const User = require("../models/userModel");
const load4Bets = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loadbets = yield Bets.find({ betcreationstatus: 'openedbet' }).sort({ createDate: 'desc' }).limit(4);
    res.json({
        loadbets
    });
}));
const loadBets = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.params.page;
    const limit = req.params.limit;
    const loadbets = yield Bets.find({ betcreationstatus: 'openedbet' })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit));
    const count = yield Bets.countDocuments();
    res.json({
        loadbets,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
    });
}));
const JoinBet = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const betAmt = req.body.betAmount;
        const betPartipntscount = req.body.totalparticipantscount;
        const matchid = req.body.matchid;
        const user_Id = req.body.userId;
        const betId = req.body.betId;
        const user_name = req.body.username;
        const openedby = req.body.openedby;
        const prediction = req.body.betprediction;
        const bettingteam = req.body.bettingteam;
        const getbet = yield Bets.findOne({ betid: betId, openedby: openedby });
        if (getbet) {
            const rempart = getbet.remainingparticipantscount;
            const partpants = getbet.participants;
            const totparticipants = getbet.totalparticipantscount;
            const match = getbet.match;
            const arrayofparticpants = partpants.split(',');
            if (rempart > 0 && arrayofparticpants.length < totparticipants) {
                console.log('rem part > 0');
                if (arrayofparticpants.indexOf(user_name) !== -1) {
                    console.log("You can't place multiple bets on the same same bet Id");
                    res.json({
                        message: "You can't place multiple bets on the same same bet Id"
                    });
                }
                else {
                    let nnrempartpants;
                    let betstatus;
                    const npartpantsarray = partpants.split(',');
                    const nwpartpants = npartpantsarray.push(user_name);
                    const nrempartpantscount = totparticipants - npartpantsarray.length;
                    if (nrempartpantscount > 0) {
                        nnrempartpants = nrempartpantscount;
                        betstatus = 'open';
                    }
                    else {
                        nnrempartpants = 0;
                        betstatus = 'closed';
                    }
                    const npartpantscount = npartpantsarray.length;
                    const newpartpants = npartpantsarray.toString();
                    const joinbet = yield Bets.create({
                        betid: betId,
                        betamount: betAmt,
                        match: match,
                        matchid: matchid,
                        userId: user_Id,
                        openedby: openedby,
                        betcondition: {
                            bettingteam: bettingteam,
                            prediction: prediction
                        },
                        totalparticipantscount: betPartipntscount,
                        participantscount: npartpantscount,
                        participants: newpartpants,
                        remainingparticipantscount: nnrempartpants,
                        betresult: null,
                        betwinners: '',
                        betlosers: '',
                        betcreationstatus: 'joinedbet',
                        betstatus: betstatus
                    });
                    yield Bets.updateOne({ betid: betId, openedby: openedby }, { $set: { participants: newpartpants, participantscount: npartpantscount, remainingparticipantscount: nnrempartpants, betstatus: betstatus } });
                    if (joinbet) {
                        console.log('greatam ,', joinbet);
                        const getuser = yield User.findOne({ userId: user_Id });
                        if (getuser) {
                            const betjoinedcount = getuser.betsjoinedcount + 1;
                            yield User.updateOne({ userId: user_Id }, { $set: { betsjoinedcount: betjoinedcount } });
                        }
                        const getallbets = yield Bets.find({ betid: betId });
                        if (getallbets) {
                            for (const getallbet of getallbets) {
                                const user_id = getallbet.userId;
                                yield Bets.updateOne({ betid: betId, userId: user_id }, { $set: { participants: newpartpants, participantscount: npartpantscount, remainingparticipantscount: nnrempartpants, betstatus: betstatus } });
                            }
                        }
                    }
                }
            }
            else {
                getbet.betstatus = 'closed';
                console.log('betstatus ran');
                yield getbet.save();
            }
            res.json({
                message: "Bet with Id " + betId + " joined successfully"
            });
        }
    }
    catch (error) {
        console.log('console error', error);
    }
}));
const getbetConditions = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const betID = req.body.betId;
    try {
        const betconditions = yield Bets.aggregate([
            {
                $match: {
                    betid: betID
                }
            },
            {
                $lookup: {
                    from: 'users', // assuming the collection name for users is 'users'
                    localField: 'userId',
                    foreignField: 'userId',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $group: {
                    _id: '$userId',
                    username: { $first: '$user.username' },
                    betcondition: { $push: '$betcondition' }
                }
            }
        ]);
        res.json({
            betconditions
        });
    }
    catch (error) {
        console.log('betconditions error', error);
    }
}));
const searchBetKeyWords = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchKeyword = req.body.searchkeyword;
    try {
        const keywordResult = yield Bets.aggregate([{
                $match: {
                    $or: [
                        { match: searchKeyword ? { $regex: new RegExp(`^${searchKeyword}`, 'i') } : { $exists: true } },
                        { openedby: searchKeyword ? { $regex: new RegExp(`^${searchKeyword}`, 'i') } : { $exists: true } },
                        { betstatus: searchKeyword ? { $regex: new RegExp(`^${searchKeyword}`, 'i') } : { $exists: true } },
                    ]
                }
            },
            {
                $project: {
                    match: 1,
                    openedby: 1,
                    betstatus: 1
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
const betListSearch = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchKeyword = req.body.searchkeyword;
    const page = req.body.currentPage;
    const limit = req.body.limit;
    try {
        const loadbets = yield Bets.find({
            $or: [
                { match: searchKeyword ? { $regex: new RegExp(`^${searchKeyword}`, 'i') } : { $exists: true } },
                { openedby: searchKeyword ? { $regex: new RegExp(`^${searchKeyword}`, 'i') } : { $exists: true } },
                { betstatus: searchKeyword ? { $regex: new RegExp(`^${searchKeyword}`, 'i') } : { $exists: true } },
            ]
        }).skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit));
        ;
        const count = yield Bets.countDocuments();
        res.json({
            loadbets,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    }
    catch (error) {
    }
}));
const filterByClosedBets = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.body.currentPage;
    const limit = req.body.limit;
    try {
        const loadbets = yield Bets.find({ betstatus: 'closed' }).skip((Number(page) - 1) * Number(limit)).limit(Number(limit));
        ;
        const count = yield Bets.countDocuments();
        res.json({
            loadbets,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    }
    catch (error) {
    }
}));
const filterByOpenBets = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.body.currentPage;
    const limit = req.body.limit;
    try {
        const loadbets = yield Bets.find({ betstatus: 'open' }).skip((Number(page) - 1) * Number(limit)).limit(Number(limit));
        const count = yield Bets.countDocuments();
        res.json({
            loadbets,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    }
    catch (error) {
    }
}));
const filterByBetAmount = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filterbetamount = req.body.filterbetamount;
    const page = req.body.currentPage;
    const limit = req.body.limit;
    try {
        const loadbets = yield Bets.find({ betAmount: { $gte: filterbetamount } }).skip((Number(page) - 1) * Number(limit)).limit(Number(limit));
        ;
        const count = yield Bets.countDocuments();
        res.json({
            loadbets,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    }
    catch (error) {
    }
}));
module.exports = { load4Bets, loadBets, JoinBet, getbetConditions, searchBetKeyWords, betListSearch, filterByClosedBets, filterByOpenBets, filterByBetAmount };
