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
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: Number,
        required: true,
        unique: true
    },
    sponsorId: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    refId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "referrals"
    },
    password: {
        type: String,
        required: true
    },
    isinfluencer: {
        type: Boolean
    },
    badge: {
        type: String,
        required: true
    },
    tpin: {
        type: Number,
        required: true
    },
    betsopenedcount: {
        type: Number,
        default: 0
    },
    betsjoinedcount: {
        type: Number,
        default: 0
    },
    nfts: {
        type: String,
        default: null
    },
    nftscount: {
        type: Number,
        default: 0
    },
    emailcode: {
        type: Number,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    status: {
        type: String,
        required: true
    },
    activated: {
        type: Boolean,
        default: false
    },
    walletaddress: {
        type: String,
    },
    bscwalletaddress2: {
        type: String,
    },
    bscwalletaddress: {
        type: String
    },
    bscwalletprivatekey: {
        type: String
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    pic: {
        type: String,
        required: true,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
}, {
    timestamps: true,
});
userSchema.methods.matchPassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.compare(enteredPassword, this.password);
    });
};
// will encrypt password everytime its saved
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            next();
        }
        const salt = yield bcrypt.genSalt(10);
        this.password = yield bcrypt.hash(this.password, salt);
    });
});
const User = mongoose.model("users", userSchema);
module.exports = User;
