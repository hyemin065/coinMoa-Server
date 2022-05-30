import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userId: String,
    userPassword: String,
  },
  { timestamps: true, collection: 'users' },
);

const User = mongoose.model('User', userSchema);

export default User;
