"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userModel_1 = __importDefault(require("./Model/userModel"));
const coinModel_1 = __importDefault(require("./Model/coinModel"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
mongoose_1.default
    .connect(`${process.env.MONGODB_URL}`)
    .then(() => {
    console.log('seccess');
})
    .catch(() => {
    console.log('error');
});
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: '*', credentials: true }));
app.post('/users/signup', (req, res) => {
    let temp = {
        userId: req.body.userId,
        userPassword: req.body.userPassword,
    };
    const userSignup = new userModel_1.default(temp);
    userModel_1.default.findOne({
        userId: req.body.userId,
    })
        .then((item) => {
        if (item === null) {
            userSignup.save().then(() => {
                res.status(200).json({ success: true, user: userSignup });
            });
        }
        else {
            res.status(400).json({ success: false, message: '아이디가 중복되었습니다' });
        }
    })
        .catch((error) => {
        console.log(error);
        res.status(500).json({ success: false, message: 'server error' });
    });
});
app.post('/users/signin', (req, res) => {
    userModel_1.default.find({
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
        .catch((error) => {
        console.log(error);
        res.status(500).json({ success: false, message: 'server error' });
    });
});
app.post('/users/ischeckId', (req, res) => {
    userModel_1.default.findOne({
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
        .catch((error) => {
        console.log(error);
        res.status(500).json({ success: false, message: 'server error' });
    });
});
app.post('/users', (req, res) => {
    userModel_1.default.findOne({ _id: req.body.id })
        .exec()
        .then((item) => {
        if (item.length === 0) {
            res.status(400).json({ success: false, message: '유저를 찾지 못했습니다.' });
            return;
        }
        res.status(200).json({ success: true, user: item });
    })
        .catch((error) => {
        console.log(error);
        res.status(500).json({ success: false, message: 'server error' });
    });
});
//coin
app.post('/coin/coinAdd', (req, res) => {
    let temp = {
        userId: req.body.userId,
        apiCallName: req.body.apiCallName,
        market: req.body.market,
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
    const CoinAdd = new coinModel_1.default(temp);
    CoinAdd.save()
        .then(() => {
        res.status(200).json({ success: true, coin: CoinAdd });
    })
        .catch((error) => {
        console.log(error);
        res.status(500).json({ success: false, message: 'server error' });
    });
});
app.post('/coin/update', (req, res) => {
    coinModel_1.default.findOneAndUpdate({
        userId: req.body.userId,
        apiCallName: req.body.apiCallName,
        market: req.body.market,
    }, {
        $set: {
            average: req.body.average,
            quantity: req.body.quantity,
            transactionPrice: req.body.transactionPrice,
            totalAmount: req.body.totalAmount,
        },
    }, { new: true })
        .exec()
        .then((item) => {
        if (item !== null) {
            res.status(200).json({ success: true, coin: item });
        }
    })
        .catch((error) => {
        console.log(error);
        res.status(500).json({ success: false, message: 'server error' });
    });
});
app.post('/coin/delete', (req, res) => {
    coinModel_1.default.findOneAndDelete({
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
        .catch((error) => {
        console.log(error);
        res.status(500).json({ success: false, message: 'server error' });
    });
});
app.get('/coin/getCoin/:id', (req, res) => {
    coinModel_1.default.find({
        userId: req.params.id,
    })
        .then((item) => {
        res.status(200).json({ success: true, coin: item });
    })
        .catch((error) => {
        res.status(500).json({ success: false, message: 'server error' });
    });
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
