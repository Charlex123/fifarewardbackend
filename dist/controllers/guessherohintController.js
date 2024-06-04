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
const Hint = require('../models/guessherohintModel');
const addUpdateHint = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address, name, image, hint } = req.body;
    const hint_ = yield Hint.findOne({ address: address });
    if (!hint_) {
        const hinta = new Hint({ address: address, selectedName: name, selectedImage: image, selectedHint: hint });
        yield hinta.save();
        res.status(200).json({ message: 'action success', hint: hinta });
    }
    else {
        hint_.selectedName = name;
        hint_.selectedImage = image;
        hint_.selectedHint = hint;
        hint_.save();
        return res.json({ message: 'action success', hint: hint_ });
    }
}));
const getHint = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address } = req.body;
    const hint_ = yield Hint.findOne({ address: address });
    if (!hint_) {
        return res.json({ message: 'no hint' });
    }
    else {
        return res.json({ message: 'action success', hint: hint_ });
    }
}));
module.exports = { addUpdateHint, getHint };
