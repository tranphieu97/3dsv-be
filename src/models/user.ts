import mongoose from 'mongoose';

const userShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  googleId: {
    type: String,
  },
  photo: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
  },
});

const User = mongoose.model('User', userShema);
export default User;
