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
	pageTitle = 'Employee Registration';
	return res.render('index.ejs', { 'title': pageTitle });
	// return res.render('index', {page:'Home', menuId:'home'});
});

router.post('/', function (req, res, next) {
	console.log(req.body);
	var personInfo = req.body;

	if (!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf) {
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			User.findOne({ email: personInfo.email }, function (err, data) {

				if (!data) {

					User.findOne({ username: personInfo.username }, function (err, data) {
						if (!data) {

							var c;
							User.findOne({}, function (err, data) {

								if (data) {
									console.log("if");
									c = data.unique_id + 1;
								} else {
									c = 1;
								}

								var newPerson = new User({
									unique_id: c,
									email: personInfo.email,
									username: personInfo.username,
									password: personInfo.password,
									passwordConf: personInfo.passwordConf
								});

								newPerson.save(function (err, Person) {
									if (err)
										console.log(err);
									else
										console.log('Success');
								});

							}).sort({ _id: -1 }).limit(1);
							res.send({ "Success": "You are regestered,You can login now." });

						} else {
							res.send({ "Success": "Username is already used." });
						}
					});



				} else {
					res.send({ "Success": "Email is already used." });
				}

			});
		} else {
			res.send({ "Success": "password is not matched" });
		}
	}
});

router.get('/login', function (req, res, next) {
	pageTitle = 'Login';
	return res.render('login.ejs', { 'title': pageTitle });
});

router.post('/login', function (req, res, next) {
	//console.log(req.body);
	User.findOne({ email: req.body.email }, function (err, data) {
		if (data) {

			if (data.password == req.body.password) {
				//console.log("Done Login");
				req.session.userId = data.unique_id;
				req.session.access = data.access;

				//console.log(req.session.userId);
				res.send({ "Success": "Success!" });

			} else {
				res.send({ "Success": "Wrong password!" });
			}
		} else {
			res.send({ "Success": "This Email Is not regestered!" });
		}
	});
});

router.get('/profile', function (req, res, next) {
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
				pageTitle = 'Admin Home';
				return res.render('admin/adminstart.ejs', { "name": data.username, "email": data.email, "date": date, 'title': pageTitle });
			}
		}
	});
});

router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
		// delete session object
		req.session.destroy(function (err) {
			if (err) {
				return next(err);
			} else {
				return res.redirect('/');
			}
		});
	}
});

router.get('/forgetpass', function (req, res, next) {
	pageTitle = 'Find Password';
	res.render("forget.ejs", { "title": pageTitle });
});

router.post('/forgetpass', function (req, res, next) {
	//console.log('req.body');
	//console.log(req.body);
	User.findOne({ email: req.body.email }, function (err, data) {
		console.log(data);
		if (!data) {
			res.send({ "Success": "This Email Is not regestered!" });
		} else {
			// res.send({"Success":"Success!"});
			if (req.body.password == req.body.passwordConf) {
				data.password = req.body.password;
				data.passwordConf = req.body.passwordConf;

				data.save(function (err, Person) {
					if (err)
						console.log(err);
					else
						console.log('Success');
					res.send({ "Success": "Password changed!" });
				});
			} else {
				res.send({ "Success": "Password does not matched! Both Password should be same." });
			}
		}
	});

});


// router.get('/workreport', function (req, res, next) {
// 	console.log("Workreport");
// 	User.findOne({ unique_id: req.session.userId }, function (err, data) {
// 		console.log("data");
// 		console.log(data);
// 		if (!data) {
// 			res.redirect('/');
// 		} else {
// 			if(req.session.access === 'worker'){
// 				pageTitle = 'Employee Workreport';
// 				//console.log("found");
// 				console.log(date);
// 				return res.render('workreport.ejs', { "name": data.username, "date": date, 'title': pageTitle });
// 			}else{
// 				res.redirect('/profile');
// 			}
			
// 		}
// 	});
// });

// router.get('/addxp', function (req, res, next) {
// 	console.log("profile");
// 	User.findOne({ unique_id: req.session.userId }, function (err, data) {
// 		console.log("data");
// 		console.log(data);

// 		if (!data) {
// 			res.redirect('/');
// 		} else {
// 			//console.log("found");
// 			if (req.session.access === 'worker') {
// 				pageTitle = 'Worker Home';
// 				return res.render('data.ejs', { "name": data.username, "email": data.email, 'title': pageTitle });
// 			} else {
// 				pageTitle = 'Add XP';
// 				return res.render('addxp.ejs', { "name": data.username, "email": data.email, "date": date, 'title': pageTitle });
// 			}
// 		}
// 	});
// });





module.exports = router;