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
const asyncHandler = require('express-async-handler');
const Users = require('../models/usersModel');
const addUpdateUser = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, address, sponsoraddress, issponsorinfluencer, isinfluencer, badge, pic } = req.body;
    if (address == sponsoraddress) {
        return res.json({ message: "You can't refer yourself" });
    }
    const user_ = yield Users.findOne({ address: address });
    if (!user_) {
        const user = new Users({ username: username, address: address, sponsoraddress: sponsoraddress, isinfluencer: isinfluencer, issponsorinfluencer: issponsorinfluencer, badge: badge, pic: pic });
        yield user.save();
        res.status(200).json({ message: 'action success', user: user });
    }
    else {
        user_.username = username;
        user_.address = address;
        user_.sponsoraddress = sponsoraddress;
        user_.isinfluencer = isinfluencer;
        user_.issponsorinflencer = issponsorinfluencer;
        user_.badge = badge;
        user_.save();
        return res.json({ message: 'action success', user: user_ });
    }
}));
const UpdateprofilePicture = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address, filePath_ } = req.body;
    const gUser = yield Users.findOne({ address: address });
    if (gUser) {
        gUser.verified = true;
        gUser.pic = filePath_;
        const found__User = yield gUser.save();
        if (found__User) {
            const foundUser = yield Users.updateOne({ address: address }, { $set: { pic: filePath_ } });
            if (foundUser) {
                const foundUser_ = yield Users.findOne({ address: address });
                res.json({
                    pic: foundUser_.pic,
                });
            }
        }
    }
    else {
        res.json({ message: "User not found" });
    }
}));
const UpdateUsername = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address, username } = req.body;
    const gUser = yield Users.findOne({ address: address });
    if (gUser) {
        gUser.verified = true;
        gUser.username = username;
        const found__User = yield gUser.save();
        if (found__User) {
            const foundUser = yield Users.updateOne({ address: address }, { $set: { username: username } });
            if (foundUser) {
                const foundUser_ = yield Users.findOne({ address: address });
                res.json({
                    username: foundUser_.username,
                });
            }
        }
    }
    else {
        res.json({ message: "User not found" });
    }
}));
const UpdateReflinkId = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address, encrypted } = req.body;
    const gUser = yield Users.findOne({ address: address });
    if (gUser) {
        gUser.verified = true;
        gUser.encryptedreflinkid = encrypted;
        const found__User = yield gUser.save();
        if (found__User) {
            const foundUser = yield Users.updateOne({ address: address }, { $set: { encryptedreflinkid: encrypted } });
            if (foundUser) {
                const foundUser_ = yield Users.findOne({ address: address });
                res.json({
                    encryptedreflinkid: foundUser_.encryptedreflinkid,
                });
            }
        }
    }
    else {
        res.json({ message: "User not found" });
    }
}));
const getUsers = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield Users.find({}, 'address pic -_id'); // Select username and profilePic, exclude _id
    if (users) {
        res.json({
            data: users
        });
    }
    else {
        res.json({
            data: "Oops! something happened"
        });
    }
}));
const getUser = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address } = req.body;
    const user = yield Users.findOne({ address: address });
    res.status(200).json({ user });
}));
module.exports = { addUpdateUser, getUser, UpdateprofilePicture, UpdateUsername, UpdateReflinkId, getUsers };
