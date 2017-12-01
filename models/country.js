var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var countrySchema = new Schema({
    country: String,
    capital: String,
    content: String
});

var Country = mongoose.model('Country', countrySchema);
module.exports = Country;