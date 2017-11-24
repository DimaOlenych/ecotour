const mongoose = require('mongoose'),
    Tour = mongoose.model('Tour');

module.exports = {
    all: function(req, res) {
        Tour.find({})
            .then(tours => res.status(200).json(tours))
            .catch(err => res.status(500).json(err));
    },
    createTour: function(req, res) {
        var new_Tour = new Tour(req.body);
        new_Tour.saveAsync()
            .then(tour => res.status(200).json(tour))
            .catch(err => res.status(500).json(err))
    },
    read: function(req, res) {
        Tour.findById(req.params.tourId)
            .then(tour => res.status(200).json(tour))
            .catch(err => res.status(500).json(err));
    },
    update: function(req, res) {
        Tour.findByIdAndUpdate(req.params.tourId,
                req.body, {
                    new: true
                })
            .then(Tour => res.status(200).json(Tour))
            .catch(err => res.status(500).json(err));
    },
    delete: function(req, res) {
        Tour.remove({
                _id: req.params.tourId
            })
            .then(Tour => res.status(200).json({
                message: "Ok"
            }))
            .catch(err => res.status(500).json(err))
    }
}