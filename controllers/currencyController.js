const mongoose = require('mongoose'),
    Currency = mongoose.model('Currency');

module.exports = {
    all: function(req, res) {
        Currency.find({})
            .then(curr => res.status(200).json(curr))
            .catch(err => res.status(500).json(err));
    },

    createCurrency: function(req, res) {
        var new_Currency = new Currency(req.body);
        if (new_Currency.currencyPrice < 0)
            res.status(500).json({ msg: "Валюта не може бути від'ємною!!!" });
        new_Currency.save()
            .then(curr => res.status(200).json(curr))
            .catch(err => res.status(500).json(err));
    },

    read: function(req, res) {
        Currency.findById(req.params.currencyId)
            .then(curr => res.status(200).json(curr))
            .catch(err => res.status(500).json(err));
    },

    update: function(req, res) {
        Currency.findByIdAndUpdate(req.params.currencyId, {
                $set: {
                    currencyName: req.body.currencyName,
                    currencyPrice: req.body.currencyPrice
                }
            }, {
                new: true
            })
            .then(curr => res.status(200).json(curr))
            .catch(err => res.status(500).json(err));
    },

    delete: function(req, res) {
        Currency.remove({
                _id: req.params.currencyId
            })
            .then(curr => res.status(200).json({
                message: "Ok"
            }))
            .catch(err => res.status(500).json(err))
    }
}