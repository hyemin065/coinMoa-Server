"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userModel_1 = __importDefault(require("./Model/userModel"));
mongoose_1.default
    .connect('mongodb+srv://coinMoa:hitech03@cluster0.rlkk4.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
    console.log('seccess');
})
    .catch(() => {
    console.log('error');
});
const app = (0, express_1.default)();
const port = 5000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: '*', credentials: true }));
app.post('/users/signup', (req, res) => {
    let temp = {
        userId: req.body.userId,
        userPassword: req.body.userPassword,
    };
    const userSignup = new userModel_1.default(temp);
    userSignup
        .save()
        .then(() => {
        res.status(200).json({ success: true, user: userSignup });
    })
        .catch((error) => {
        console.log(error);
        res.status(400).json({ success: false, message: 'server error' });
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
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
// const Cat = mongoose.model('Cat', { name: String });
// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
