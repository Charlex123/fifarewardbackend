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
const Mining = require("../models/miningModel");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const generateUid = require("../utils/generateUid");
const dotenv = require("dotenv");
dotenv.config();
process.env.TZ = 'Europe/London';
const StartMining = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address, amountmined, miningrate } = req.body;
    const miningstatus = "Active";
    const startsmining = yield Mining.create({
        miningId: generateUid(),
        address,
        miningrate,
        miningstatus,
        amountmined
    });
    if (startsmining) {
        const minedetails = yield Mining.findOne({ address: address });
        if (minedetails) {
            res.status(201).json({
                _id: minedetails._id,
                miningId: minedetails.miningId,
                address: minedetails.address,
                miningrate: minedetails.miningrate,
                miningstatus: minedetails.miningstatus,
                amountmined: minedetails.amountmined
            });
        }
        else {
            res.json({
                message: "no mining details found"
            });
        }
    }
    else {
        res.json({
            message: "Oops! something happened"
        });
    }
}));
const UpdateMiningAmount = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address, newamountmined, miningstatus } = req.body;
    const findMining = yield Mining.findOne({ address: address });
    if (findMining) {
        findMining.verified = true;
        findMining.amountmined = newamountmined;
        findMining.miningstatus = miningstatus;
        const found_Mining = yield findMining.save();
        if (found_Mining) {
            const foundMining = yield Mining.updateOne({ address: address }, { $set: { amountmined: newamountmined } });
            const foundMining_ = yield Mining.findOne({ address: address });
            if (foundMining_) {
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
    }
    else {
        res.json({ message: "Mining not found" });
    }
}));
const StopMining = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const findMining = yield Mining.findOne({ userId: userId });
    if (findMining) {
        findMining.verified = true;
        findMining.miningstatus = "Stopped";
        const found_Mining = yield findMining.save();
        if (found_Mining) {
            const foundMining = yield Mining.updateOne({ userId: userId }, { $set: { "miningstatus": "Stopped" } });
            const foundMining_ = yield Mining.findOne({ userId: userId });
            if (foundMining_) {
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
    }
    else {
        res.json({ message: "Mining-- not found" });
    }
}));
const Getminingdetails = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const address = req.body.address;
    const getusermingdetails = yield Mining.findOne({ address: address });
    if (getusermingdetails) {
        res.status(201).json({
            _id: getusermingdetails._id,
            miningId: getusermingdetails.miningId,
            address: getusermingdetails.address,
            miningrate: getusermingdetails.miningrate,
            miningstatus: getusermingdetails.miningstatus,
            amountmined: getusermingdetails.amountmined
        });
    }
    else {
        res.json({
            message: "no mining details found"
        });
    }
}));
module.exports = { StartMining, Getminingdetails, UpdateMiningAmount, StopMining };
