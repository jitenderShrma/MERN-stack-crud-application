const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MerchantSchema = new Schema({
  seial_number: {
    type: Number
  },
  name:{
    type:String,
    lowercase: true,
    require:true
  },
  description:{
    type:String
  },
  isActivated: {
    type: Boolean,
    default: true
  },
  created_date: {
    type: Date,
    default: Date.now()
  },
  changes_history: [{
    type:Date
  }]
});

const Merchant = mongoose.model('Merchant_db',MerchantSchema);

module.exports = Merchant;