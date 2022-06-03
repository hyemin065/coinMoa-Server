import mongoose from 'mongoose';

const { Schema } = mongoose;

const coinSchema = new Schema(
  {
    userId: String, //유저아이디
    apiCallName: String, // api 호출할 id
    market: String, // 거래소
    name: String, // 코인이름
    symbol: String, //코인 심볼
    thumb: String, // 코인 썸네일
    date: String, // 코인 매입 날짜
    transaction: String, // 매수 or 매도
    currency: String, // 통화
    average: Number, // 평단
    transactionPrice: Number, // 매수가 or 매도가
    quantity: Number, // 보유수량
    totalAmount: Number, //매수금액
  },
  { timestamps: true, collection: 'coins' },
);

const Coin = mongoose.model('Coin', coinSchema);

export default Coin;
