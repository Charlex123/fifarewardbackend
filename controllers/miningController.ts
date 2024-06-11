export {};
const asyncHandler = require("express-async-handler");
const Mining = require("../models/miningModel");
const axios = require("axios") 
const { v4: uuidv4 } = require("uuid");
const generateUid = require("../utils/generateUid");
const dotenv = require("dotenv");
dotenv.config();

process.env.TZ = 'Europe/London';


const StartMining = asyncHandler(async (req:any,res:any) => {
    const {address, amountmined, miningrate} = req.body;
    const miningstatus = "Active";
    const startsmining = await Mining.create({
        miningId: generateUid(),
        address,
        miningrate,
        miningstatus,
        amountmined
      });
    if(startsmining) {
        const minedetails = await Mining.findOne({address: address});
        if(minedetails !== null) {
            res.status(201).json({
                _id: minedetails._id,
                miningId: minedetails.miningId,
                address: minedetails.address,
                miningrate: minedetails.miningrate,
                miningstatus: minedetails.miningstatus,
                amountmined: minedetails.amountmined
              });
        }else {
            res.json({
                message: "no mining details found"
              });
        }
    }else {
        res.json({
            message: "Oops! something happened"
          });
    }
  })

  const UpdateMiningAmount = asyncHandler(async (req:any,res:any) => {
    const {address, newamountmined, miningstatus} = req.body;
    const findMining = await Mining.findOne({address: address});
  if (findMining) {
    findMining.verified = true;
    findMining.amountmined = newamountmined;
    findMining.miningstatus = miningstatus;
    const found_Mining = await findMining.save();
    if(found_Mining) {
      const foundMining = await Mining.updateOne(
        {address:address}, { $set: {amountmined: newamountmined}});
        const foundMining_ = await Mining.findOne({address: address});
      if(foundMining_) {
        res.status(201).json({
            _id: foundMining_._id,
            miningId: foundMining_.miningId,
            userId: foundMining_.userId,
            miningrate: foundMining_.miningrate,
            miningstatus: foundMining_.miningstatus,
            amountmined: foundMining_.amountmined
          });
      }
    }
    } else {
      res.json({message: "Mining not found"});
    }
  })

  const StopMining = asyncHandler(async (req:any,res:any) => {
    const {address} = req.body;
    const findMining = await Mining.findOne({address: address});
  if (findMining) {
    findMining.verified = true;
    findMining.miningstatus = "Stopped";
    const found_Mining = await findMining.save();
    if(found_Mining) {
      const foundMining = await Mining.updateOne(
        {address:address}, { $set: {"miningstatus": "Stopped"}});
        const foundMining_ = await Mining.findOne({address: address});
      if(foundMining_) {
        res.status(201).json({
            _id: foundMining_._id,
            miningId: foundMining_.miningId,
            userId: foundMining_.userId,
            miningrate: foundMining_.miningrate,
            miningstatus: foundMining_.miningstatus,
            amountmined: foundMining_.amountmined
          });
      }
    }
    } else {
      res.json({message: "Mining-- not found"});
    }
  })

  const Getminingdetails = asyncHandler(async (req:any,res:any) => {
        const address = req.body.address;
        
        const getusermingdetails = await Mining.findOne({ address: address });
        if(getusermingdetails) {
            res.status(201).json({
                _id: getusermingdetails._id,
                miningId: getusermingdetails.miningId,
                address: getusermingdetails.address,
                miningrate: getusermingdetails.miningrate,
                miningstatus: getusermingdetails.miningstatus,
                amountmined: getusermingdetails.amountmined
              });
        }else {
            res.json({
                message: "no mining details found"
              });
        }
  })


module.exports = { StartMining, Getminingdetails, UpdateMiningAmount, StopMining } 