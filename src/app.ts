import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import User from './Model/userModel';
import Coin from './Model/coinModel';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

mongoose
  .connect(`${process.env.MONGODB_URL}`)
  .then(() => {
    console.log('seccess');
  })
  .catch(() => {
    console.log('error');
  });

app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));

app.post('/users/signup', (req, res) => {
  let temp = {
    userId: req.body.userId,
    userPassword: req.body.userPassword,
  };
  const userSignup = new User(temp);

  User.findOne({
    userId: req.body.userId,
  })
    .then((item) => {
      if (item === null) {
        userSignup.save().then(() => {
          res.status(200).json({ success: true, user: userSignup });
        });
      } else {
        res.status(400).json({ success: false, message: '아이디가 중복되었습니다' });
      }
    })
    .catch((error: any) => {
      console.log(error);
      res.status(500).json({ success: false, message: 'server error' });
    });
});

app.post('/users/signin', (req, res) => {
  User.find({
    userId: req.body.userId,
    userPassword: req.body.userPassword,
  })
    .exec()
    .then((item) => {
      if (item.length === 0) {
        res.status(400).json({ success: false, message: '유저를 찾지 못했습니다.' });
        return;
      }
      res.status(200).json({ success: true, user: item });
    })
    .catch((error: any) => {
      console.log(error);
      res.status(500).json({ success: false, message: 'server error' });
    });
});

app.post('/users/ischeckId', (req, res) => {
  User.findOne({
    userId: req.body.userId,
  })
    .exec()
    .then((item) => {
      if (item === null) {
        res.status(200).json({ success: true, user: item });
        return;
      }
      res.status(400).json({ success: false, message: '중복된 아이디입니다.' });
    })
    .catch((error: any) => {
      console.log(error);
      res.status(500).json({ success: false, message: 'server error' });
    });
});

app.post('/users', (req, res) => {
  User.findOne({ _id: req.body.id })
    .exec()
    .then((item) => {
      if (item.length === 0) {
        res.status(400).json({ success: false, message: '유저를 찾지 못했습니다.' });
        return;
      }
      res.status(200).json({ success: true, user: item });
    })
    .catch((error: any) => {
      console.log(error);
      res.status(500).json({ success: false, message: 'server error' });
    });
});

//coin

app.post('/coin/coinAdd', (req, res) => {
  let temp = {
    userId: req.body.userId, //아이디
    apiCallName: req.body.apiCallName, //api호출 네임
    market: req.body.market, //거래소
    name: req.body.name,
    symbol: req.body.symbol,
    thumb: req.body.thumb,
    currency: req.body.currency,
    transaction: req.body.transaction,
    date: req.body.date,
    transactionPrice: req.body.transactionPrice,
    average: req.body.average,
    totalAmount: req.body.totalAmount,
    quantity: req.body.quantity,
  };
  const CoinAdd = new Coin(temp);

  CoinAdd.save()
    .then(() => {
      res.status(200).json({ success: true, coin: CoinAdd });
    })
    .catch((error: any) => {
      console.log(error);
      res.status(500).json({ success: false, message: 'server error' });
    });
});

app.post('/coin/update', (req, res) => {
  Coin.findOneAndUpdate(
    {
      userId: req.body.userId,
      apiCallName: req.body.apiCallName,
      market: req.body.market,
    },
    {
      $set: {
        average: req.body.average,
        quantity: req.body.quantity,
        transactionPrice: req.body.transactionPrice,
        totalAmount: req.body.totalAmount,
      },
    },
    { new: true },
  )
    .exec()
    .then((item) => {
      if (item !== null) {
        res.status(200).json({ success: true, coin: item });
      }
    })

    .catch((error: any) => {
      console.log(error);
      res.status(500).json({ success: false, message: 'server error' });
    });
});

app.post('/coin/delete', (req, res) => {
  Coin.findOneAndDelete({
    userId: req.body.userId,
    apiCallName: req.body.apiCallName,
    market: req.body.market,
  })
    .exec()
    .then((item) => {
      if (item) {
        console.log(item);
        res.status(200).json({ success: true, coin: item });
        return;
      }
      res.status(400).json({ success: false, message: '해당 코인 없음' });
    })
    .catch((error: any) => {
      console.log(error);
      res.status(500).json({ success: false, message: 'server error' });
    });
});

app.get('/coin/getCoin/:id', (req, res) => {
  Coin.find({
    userId: req.params.id,
  })
    .then((item) => {
      res.status(200).json({ success: true, coin: item });
    })
    .catch((error: any) => {
      res.status(500).json({ success: false, message: 'server error' });
    });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
