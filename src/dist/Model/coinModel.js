"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const coinSchema = new Schema({
    userId: String,
    apiCallName: String,
    market: String,
    name: String,
    symbol: String,
    thumb: String,
    date: String,
    transaction: String,
    currency: String,
    average: Number,
    transactionPrice: Number,
    quantity: Number,
    totalAmount: Number, //매수금액
}, { timestamps: true, collection: 'coins' });
const Coin = mongoose_1.default.model('Coin', coinSchema);
exports.default = Coin;
