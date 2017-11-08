var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pageSchema = new Schema({
    name: String,
    main_text: String
});

var Page = mongoose.model('Page', pageSchema);
module.exports = Page;