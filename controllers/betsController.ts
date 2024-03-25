export {};
const asyncHandler = require("express-async-handler");
const Bets = require("../models/betsModel");
const User = require("../models/userModel");

const load4Bets = asyncHandler(async (req:any,res:any) => {
    const loadbets = await Bets.find({betcreationstatus: 'openedbet'}).sort({createDate: 'desc'}).limit(4);
    res.json({
        loadbets
    })
      
  })

  const loadBets = asyncHandler(async (req:any,res:any) => {
      const page = req.params.page;
      const limit = req.params.limit;

      const loadbets = await Bets.find({betcreationstatus: 'openedbet'})
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

      const count = await Bets.countDocuments();

      res.json({
        loadbets,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      })
  })

  const JoinBet = asyncHandler(async (req:any,res:any) => {
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

      const getbet = await Bets.findOne({betid:betId,openedby: openedby});
      
      if(getbet) {
        const rempart = getbet.remainingparticipantscount;
        const partpants = getbet.participants;
        const totparticipants = getbet.totalparticipantscount;
        const match = getbet.match;
        const arrayofparticpants = partpants.split(',');

        if(rempart > 0 && arrayofparticpants.length < totparticipants) {
          console.log('rem part > 0')
          if (arrayofparticpants.indexOf(user_name) !== -1) {
            console.log("You can't place multiple bets on the same same bet Id")
            res.json({
              message: "You can't place multiple bets on the same same bet Id"
            })
          } else {

            let nnrempartpants;
            let betstatus;
            const npartpantsarray = partpants.split(',');
            const nwpartpants = npartpantsarray.push(user_name);
            const nrempartpantscount = totparticipants - npartpantsarray.length;
            if(nrempartpantscount > 0) {
                nnrempartpants = nrempartpantscount;
                betstatus = 'open';
            }else {
                nnrempartpants = 0;
                betstatus = 'closed';
            }

            const npartpantscount = npartpantsarray.length;
            const newpartpants = npartpantsarray.toString();

            const joinbet = await Bets.create({
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
            })
            await Bets.updateOne({betid: betId, openedby: openedby},{$set: {participants:newpartpants,participantscount:npartpantscount,remainingparticipantscount:nnrempartpants,betstatus:betstatus}});
            if(joinbet) {
              console.log('greatam ,',joinbet)
              const getuser = await User.findOne({userId:user_Id});
              if(getuser) {
                const betjoinedcount = getuser.betsjoinedcount + 1;
                await User.updateOne({userId:user_Id},{$set: {betsjoinedcount:betjoinedcount}})
              }

              const getallbets = await Bets.find({betid:betId});
              if(getallbets) {
                for(const getallbet of getallbets) {
                  const user_id = getallbet.userId;
                  await Bets.updateOne({betid: betId, userId: user_id},{$set: {participants:newpartpants,participantscount:npartpantscount,remainingparticipantscount:nnrempartpants,betstatus:betstatus}})
                }
              }
            }
          }
          
        } else {
          getbet.betstatus = 'closed';
          console.log('betstatus ran')
          await getbet.save();
        }

        res.json({
          message: "Bet with Id "+betId+" joined successfully"
        })
      }
    } catch (error) {
      console.log('console error',error)
    }
  })

  const getbetConditions = asyncHandler(async (req:any,res:any) => {
    const betID = req.body.betId;
    try {
      const betconditions = await Bets.aggregate([
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
      })
    } catch (error) {
      console.log('betconditions error',error)
    }
  })

  const searchBetKeyWords = asyncHandler(async (req:any,res:any) => {
    const searchKeyword = req.body.searchkeyword;
    
    try {
      const keywordResult = await Bets.aggregate([{
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
      {$limit: 20}
    ]);
      res.json({
        keywordResult
      })
    } catch (error) {
      console.log('kyword search error',error)
    }
    
  })

  const betListSearch = asyncHandler(async (req:any,res:any) => {
    const searchKeyword = req.body.searchkeyword;
    const page = req.body.currentPage;
    const limit = req.body.limit;
    try {
      const loadbets = await Bets.find({
          $or: [
            { match: searchKeyword ? { $regex: new RegExp(`^${searchKeyword}`, 'i') } : { $exists: true } },
            { openedby: searchKeyword ? { $regex: new RegExp(`^${searchKeyword}`, 'i') } : { $exists: true } },
            { betstatus: searchKeyword ? { $regex: new RegExp(`^${searchKeyword}`, 'i') } : { $exists: true } },
          ]
        },
      ).skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));;
      
      const count = await Bets.countDocuments();

      res.json({
        loadbets,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      })
    } catch (error) {
    }
    
  })

  const filterByClosedBets = asyncHandler(async (req:any,res:any) => {
    const page = req.body.currentPage;
    const limit = req.body.limit;
    try {
      const loadbets = await Bets.find({betstatus: 'closed'}).skip((Number(page) - 1) * Number(limit)).limit(Number(limit));;
      
      const count = await Bets.countDocuments();

      res.json({
        loadbets,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      })
    } catch (error) {
    }
  })

  const filterByOpenBets = asyncHandler(async (req:any,res:any) => {
    const page = req.body.currentPage;
    const limit = req.body.limit;
    try {
      const loadbets = await Bets.find({betstatus: 'open'}).skip((Number(page) - 1) * Number(limit)).limit(Number(limit));
      const count = await Bets.countDocuments();
      res.json({
        loadbets,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      })
    } catch (error) {
    }
  })

  const filterByBetAmount = asyncHandler(async (req:any,res:any) => {
    const filterbetamount = req.body.filterbetamount;
    const page = req.body.currentPage;
    const limit = req.body.limit;
    try {
      const loadbets = await Bets.find({betAmount: {$gte: filterbetamount}}).skip((Number(page) - 1) * Number(limit)).limit(Number(limit));;
      
      const count = await Bets.countDocuments();

      res.json({
        loadbets,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      })
    } catch (error) {
    }
  })


module.exports = { load4Bets, loadBets, JoinBet , getbetConditions, searchBetKeyWords, betListSearch, filterByClosedBets, filterByOpenBets, filterByBetAmount} 