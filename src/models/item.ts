import mongoose from 'mongoose';
// import validator from 'validator'

const itemShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String
  },
  price: {
    type: Number,
  },
  categories: [{
    category: {
      type: String
    }
  }],
  quantity: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    trim: true
  },
  details: [{
    detail: {
      name: {
        type: String
      },
      value: {
        type: String
      }
    }
  }],
  createdDate: {
    type: Date,
    required: true
  }
})

export const Item = mongoose.model('Item', itemShema)

