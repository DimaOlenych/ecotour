var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tourSchema = new Schema({
    country_en: String,
    country_uk: String,
    days: Number,
    price: Number
});

var Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;