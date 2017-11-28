const mongoose = require('mongoose'),
    Page = mongoose.model('Page');

module.exports = {
    all: function(req, res) {
        Page.find({})
            .then(pages => res.status(200).json(pages))
            .catch(err => res.status(500).json(err));
    },
    createPage: function(req, res) {
        var new_Page = new Page(req.body);
        new_Page.save()
            .then(page => res.status(200).json(page))
            .catch(err => res.status(500).json(err));
    },

    read: function(req, res) {
        Page.findById(req.params.pageId)
            .then(page => res.status(200).json(page))
            .catch(err => res.status(500).json(err));
    },

    update: function(req, res) {
        Page.findByIdAndUpdate(req.params.pageId, { $set: { main_text: req.body.main_text } }, {
                new: true
            })
            .then(page => res.status(200).json(page))
            .catch(err => res.status(500).json(err));
    },

    delete: function(req, res) {
        Page.remove({
                _id: req.params.pageId
            })
            .then(page => res.status(200).json({
                message: "Ok"
            }))
            .catch(err => res.status(500).json(err))
    }
}