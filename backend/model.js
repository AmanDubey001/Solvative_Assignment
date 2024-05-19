const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  p5balance: {
    type: Number,
    required: true,
    default: 0
  },
  rewards: {
    type: Number,
    required: true,
    default: 0
  }
});

const  History = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
      },
      id:{
        type: String,
        required:true,
        unique: true, // Enforcing uniqueness
        default: uuidv4, // Default value to be a UUID 
      },
      sender : {
      type: String,
      required: true,
    },
    reciever: {
        type: String,
        required: true,
    },
    transfered: {
      type: Number,
      required: true,
      default: 0
    },
    recieved: {
        type: Number,
        required: true,
        default: 0
      }
  });

const User = mongoose.model('User', userSchema);
const TransactionHistory = mongoose.model('TransactionHistory', History);


module.exports ={ User, TransactionHistory};
