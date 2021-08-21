const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Xps = require('../models/xps');


const d = new Date();
const month = d.getMonth() + 1;
const day = d.getDate();
const date = d.getFullYear() + '/' +
	(('' + month).length < 2 ? '0' : '') + month + '/' +
	(('' + day).length < 2 ? '0' : '') + day;

var pageTitle = '';


router.get('/', function (req, res, next) {
	console.log("admin profile");
	User.findOne({ unique_id: req.session.userId }, function (err, data) {
		console.log("data");
		console.log(data);

		if (!data) {
			res.redirect('/');
		} else {
			//console.log("found");
			if (req.session.access === 'worker') {
				pageTitle = 'Worker Home';
				return res.render('worker/data.ejs', { "name": data.username, "email": data.email, 'title': pageTitle });
			} else {
				pageTitle = 'Admin Home';
				return res.render('admin/adminstart.ejs', { "name": data.username, "email": data.email, "date": date, 'title': pageTitle });
			}
		}
	});
});

router.get('/addxp', function (req, res, next) {
	console.log("profile");
	User.findOne({ unique_id: req.session.userId }, function (err, data) {
		console.log("data");
		console.log(data);

		if (!data) {
			res.redirect('/');
		} else {
			//console.log("found");
			if (req.session.access === 'worker') {
				pageTitle = 'Worker Home';
				return res.render('worker/data.ejs', { "name": data.username, "email": data.email, 'title': pageTitle });
			} else {
				pageTitle = 'Add XP';
				return res.render('admin/addxp.ejs', { "name": data.username, "email": data.email, "date": date, 'title': pageTitle });
			}
		}
	});
});





module.exports = router;