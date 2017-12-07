var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('admin/index', {
        title: "Адміністрування"
    });
});

router.get('/tour', function(req, res) {
    res.render('admin/tour');
});

router.get('/tours', function(req, res) {
    res.render('admin/tours');
});

router.get('/list', function(req, res) {
    res.render('admin/list');
});

router.get('/pages', function(req, res) {
    res.render('admin/pages');
});

router.get('/lists', function(req, res) {
    res.render('admin/lists');
});

router.get('/country', function(req, res) {
    res.render('admin/country');
});

router.get('/countrys', function(req, res) {
    res.render('admin/countrys');
});

router.get('/money', function(req, res) {
    res.render('admin/money');
});
module.exports = router;