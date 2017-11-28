const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const currencySchema = new Schema({
    currencyName: String,
    currencyPrice: Number,
    date: { type: Date, default: Date.now }
});

let Currency = mongoose.model('Currency', currencySchema)
module.exports = Currency;