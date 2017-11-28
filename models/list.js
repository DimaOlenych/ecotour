var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listSchema = new Schema({
    company: String,
    representative: String,
    adress: String,
    valid: String
});

var List = mongoose.model('List', listSchema);
module.exports = List;