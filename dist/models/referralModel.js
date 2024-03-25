"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const referralSchema = mongoose.Schema({
    user_objId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sponsorId: {
        type: Number,
        required: true
    },
    sponsor_objId: {
        type: String,
        required: true
    },
    activated: {
        type: Boolean,
        default: false
    },
    refGeneration: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true,
});
const Referral = mongoose.model("referrals", referralSchema);
module.exports = Referral;
