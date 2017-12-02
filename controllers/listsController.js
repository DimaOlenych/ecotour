const mongoose = require('mongoose'),
    List = mongoose.model('List');

module.exports = {
    all: function(req, res) {
        List.find({})
            .then(lists => res.status(200).json(lists))
            .catch(err => res.status(500).json(err));
    },
    createList: function(req, res) {
        var new_List = new List(req.body);
        new_List.save()
            .then(list => res.status(200).json(list))
            .catch(err => res.status(500).json(err))
    },

    read: function(req, res) {
        List.findById(req.params.listId)
            .then(list => res.status(200).json(list))
            .catch(err => res.status(500).json(err));
    },

    update: function(req, res) {
        List.findByIdAndUpdate(req.params.listId,
                req.body, {
                    new: true
                })
            .then(List => res.status(200).json(List))
            .catch(err => res.status(500).json(err));
    },

    delete: function(req, res) {
        List.remove({
                _id: req.params.listId
            })
            .then(List => res.status(200).json({
                message: "Ok"
            }))
            .catch(err => res.status(500).json(err))
    }
}