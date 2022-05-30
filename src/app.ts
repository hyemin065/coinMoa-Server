import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import User from './Model/userModel';

mongoose
  .connect('mongodb+srv://coinMoa:hitech03@cluster0.rlkk4.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('seccess');
  })
  .catch(() => {
    console.log('error');
  });

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));

app.post('/users/signup', (req, res) => {
  let temp = {
    userId: req.body.userId,
    userPassword: req.body.userPassword,
  };
  const userSignup = new User(temp);
  userSignup
    .save()
    .then(() => {
      res.status(200).json({ success: true, user: userSignup });
    })
    .catch((error: any) => {
      console.log(error);
      res.status(400).json({ success: false, message: 'server error' });
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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
