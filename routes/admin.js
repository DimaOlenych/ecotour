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
module.exports = router;