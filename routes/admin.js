var express = require('express');
var router = express.Router();
var Page = require('../models/page');

router.get('/', function(req, res) {
    res.render('admin/index');
});


router.get('/edit', function(req, res) {
    res.render('admin/edit', {
        title: "Ціни на тури",
        scripts: [
            { src: "/javascripts/ckeditor/ckeditor.js" },
            { src: "/javascripts/admin/edit.js" }
        ]
    });
});

router.post('/edit', function(req, res) {
    console.log(req.params);
    Page.findOne({ name: "about" }, function(err, page) {
        console.log(page);
        if (page) {
            page.set('main_text', req.params.editor1);
        } else
            page = new Page({
                name: 'about',
                main_text: req.params.editor1
            });
        page.save(function(err, otherPage) {
            if (err) {
                res.render('error');
            }
        })
    });
    res.render('about');
});


module.exports = router;