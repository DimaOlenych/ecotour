var express = require('express');
var router = express.Router();
var Page = require('../models/page');

router.get('/', function(req, res) {
    res.render('admin/index');
});

router.get('/edit', function(req, res) {
    console.log("Step 1");
    Page.findOne({
        name: req.query.name
    }, function(err, page) {
        console.log("Step 2");
        if (err) {
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            // render the error page
            res.status(err.status || 500);
            res.render('error');
        } else {
            console.log("Step 3 ");
            if (page == null) {
                page = new Page({
                    name: req.query.name,
                    main_text: "Empty page"
                });
                page.save(function(err) {
                    if (err) {
                        console.log("Step 4");
                        res.locals.message = err.message;
                        res.locals.error = req.app.get('env') === 'development' ? err : {};
                        // render the error page
                        res.status(err.status || 500);
                        res.render('error');
                    } else {
                        console.log("Step 5b");
                        res.render('admin/edit', {
                            scripts: [{
                                    src: "/javascripts/ckeditor/ckeditor.js"
                                },
                                {
                                    src: "/javascripts/admin/edit.js"
                                }
                            ],
                            title: "Ціни на тури",
                            hidden_id: page._id,
                            hidden_name: req.query.name,
                            main_text: page.main_text
                        });
                    }
                })
            } else {
                console.log("Step 5a");
                res.render('admin/edit', {
                    scripts: [{
                            src: "/javascripts/ckeditor/ckeditor.js"
                        },
                        {
                            src: "/javascripts/admin/edit.js"
                        }
                    ],
                    title: "Ціни на тури",
                    hidden_id: page._id,
                    hidden_name: req.query.name,
                    main_text: page.main_text
                });
            }
        }
    });
});

router.post('/edit', function(req, res) {
    console.log(req.body.hidden_id);
    Page.findByIdAndUpdate(req.body.hidden_id, {
            $set: {
                main_text: req.body.editor1
            }
        }, {
            new: true
        },
        function(err, otherPage) {
            if (err) {
                res.locals.message = err.message;
                res.locals.error = req.app.get('env') === 'development' ? err : {};
                // render the error page
                res.status(err.status || 500);
                res.render('error');
            } else
                res.redirect('/' + req.body.hidden_name);
        });
});

module.exports = router;