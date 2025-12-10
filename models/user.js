const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['fruit', 'vegetable', 'grain', 'dairy', 'protein', 'beverage', 'other'],
    required: true
  },
  calories: {
    type: Number,
    min: 0
  },
  nutrients: {
    protein: {type: Number, default: 0},
    carbs: {type: Number, default: 0},
    fat: {type: Number, default: 0},
    fiber: {type: Number, default: 0},
  },
  ServingSize: {
    amount: Number,
    unit: {type: String, default: 'g'}
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
pantry: [foodSchema],
  
});
const User = new mongoose.model('User', userSchema);

module.exports = User;
