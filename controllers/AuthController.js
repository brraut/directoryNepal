const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {sendConfirmationEmail} = require("../mail/mailer");

const register = (req, res, next) => {
	// simple error validation if empty field
	if (
		!req.body.name ||
		!req.body.email ||
		!req.body.phone ||
		!req.body.password
	) {
		return res.status(400).json({ message: "Please Enter all the Fields." });
	}
	var email = req.body.email;
	// already register user check
	User.findOne({ email }).then((user) => {
		if (user) {
			return res.status(400).json({ message: "User already exits" });
		}

		bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
			if (err) {
				res.json({
					message: "Error while creating Password",
				});
			}
			let user = new User({
				name: req.body.name,
				email: req.body.email,
				phone: req.body.phone,
				password: hashedPass,
				activated: false,
			});

			user
				.save()
				.then(async (response) => {
					
					await sendConfirmationEmail({
						toUser: response,
						hash: response._id,
					});
					res.json({
						message: "User Registered Successfully. Check Email for Activation Link",
					});
					// res.json(response)
				})
				.catch((error) => res.json(error));
		});
	});
};

const login = (req, res, next) => {
	var email = req.body.email;
	var password = req.body.password;

	User.findOne({ email }).then((user) => {
		if (user) {
			if (user.activated == true) {
				bcrypt.compare(password, user.password, function (err, result) {
					if (err) {
						res.json({
							err: err,
						});
					}
					if (result) {
						let token = jwt.sign({ id: user.id }, "keepulike", {
							expiresIn: "1h",
						});
						res.json({
							token,
							user: {
								id: user.id,
								name: user.name,
								email: user.email,
								phone: user.phone,
							},
						});
					} else {
						res.status(400).json({
							message: "Invalid Credentials",
						});
					}
				});
			} else {
				res.status(400).json({
					message: "User Not Activated: Check your mail for activation link",
				});
			}
		} else {
			res.status(400).json({
				message: "User doesn't Exit",
			});
		}
	});
};

const user = (req, res, next) => {
	User.findById(req.user.id)
		.select("-password")
		.then((user) => res.json(user));
};

const activate = (req, res, next) => {
	User.findByIdAndUpdate(req.params.hash, {
		$set: {
			activated: true,
		},
	})
		.then(() =>
			res.json({
				message: "User Activated Successfully",
			})
		)
		.catch((err) =>
			res.status(400).json({
				message: "Error Occurred while activating",
			})
		);
};

module.exports = {
	register,
	login,
	user,
	activate,
};
