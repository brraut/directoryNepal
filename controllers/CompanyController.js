const Company = require("../models/Company.model");
const { response } = require("express");
const fs = require("fs");
const slugify = require("slugify");
const Category = require("../models/category.model");

//show all projects
const index = (req, res, next) => {
	Company.find()
		.populate("district")
		.populate("category")
		.then((response) => res.json(response))
		.catch((err) => res.status(500).json({ message: "An Error Occured" }));
};

//show single project by id
const show = (req, res, next) => {
	let companyId = req.params.companyId;
	Company.findById(companyId)
	
		.then((response) => res.json(response))
		.catch((err) => res.status(500).json({ message: "An Error Occured" }));
};
const showBySlug = (req, res, next) => {
	let companySlug = req.params.companySlug;
	Company.find({slug: companySlug}).populate("reviews")
		.then((response) => res.json(response))
		.catch((err) => res.status(500).json(err));
};

const showByTrending = (req, res, next) => {
	Company.find()
	.populate("category")
		.then((response) => res.json(response))
		.catch((err) => res.status(500).json({ message: "An Error Occured" }));
};

const recent = (req, res, next) => {
	Company.find()
	.populate("category")
		.then((response) => res.json(response))
		.catch((err) => res.status(500).json({ message: "An Error Occured" }));
};

const showByCategory = (req, res, next) => {
	let slug = req.params.slug;

	Category.findOne({ slug })
	.populate("category")
		.then((response) =>
			Company.find({ category: response._id })
				.then((response) => res.json(response))
				.catch((err) => res.status(500).json({ message: "An Error Occured" }))
		)
		.catch((err) => res.status(500).json({ message: "Incorrect Slug" }));
};

//save project
const store = (req, res, next) => {
	console.log(req);
	let newProject = new Company({
		name: req.body.name,
		district: req.body.district,
		address: req.body.address,
		email: req.body.email,
		phone: req.body.phone,
		optionalPhone: req.body.optionalPhone,
		webiste: req.body.webiste,
		map: req.body.map,
		rating: null,
		reviews: [],
		category: req.body.category,
		facebook: req.body.facebook,
		instagram: req.body.instagram,
		linkedIn: req.body.instagram,
		youtube: req.body.youtube,
		about: req.body.about,
		status: "not_verified",
		userId: req.body.userId,
	});
	if (req.files.logo) {
		newProject.logo = req.files.logo[0].path;
	}
	if (req.files.banner) {
		newProject.banner = req.files.banner[0].path;
	}
	newProject
		.save()
		.then(() =>
			res.json({
				message: "Company Added SuccessFully",
			})
		)
		.catch((err) => {
			if (req.files.logo) {
				fs.unlink(req.files.logo[0].path, (err) => {
					if (err) {
						console.error(err);
						return;
					}
				});
			}
			if (req.files.banner) {
				fs.unlink(req.files.banner[0].path, (err) => {
					if (err) {
						console.error(err);
						return;
					}
				});
			}
			res.status(500).json(err);
		});
};

// update single project by id
const update = (req, res, next) => {
	let companyId = req.params.companyId;
	let oldLogo;
	let oldbanner;
	Company.findById(companyId).then((response) => {
		(oldLogo = response.logo), (oldbanner = response.banner);
	});
	let updateData = {
		name: req.body.name,
		district: req.body.district,
		address: req.body.address,
		email: req.body.email,
		phone: req.body.phone,
		optionalPhone: req.body.optionalPhone,
		webiste: req.body.webiste,
		map: req.body.map,
		category: req.body.category,
		facebook: req.body.facebook,
		instagram: req.body.instagram,
		linkedIn: req.body.instagram,
		youtube: req.body.youtube,
		about: req.body.about,
		userId: req.body.userId,
	};
	if (req.files.logo) {
		updateData.logo = req.files.logo[0].path;
	}
	if (req.files.banner) {
		updateData.banner = req.files.banner[0].path;
	}

	Company.findOneAndUpdate(companyId, updateData)
		.then(() => {
			res.json({
				message: "Successfully Updated",
			});
		})
		.catch((err) => res.json(err));
};

// update logo
const updateLogo = (req, res, next) => {
	// res.send(req.file)
	let companyId = req.params.companyId;
	let oldLogo;
	Company.findById(companyId).then((response) => {
		oldLogo = response.logo;
	});

	Company.findByIdAndUpdate(companyId, {
		$set: {
			logo: req.file.path,
		},
	})
		.then(() => {
			if (req.file) {
				fs.unlink(oldLogo, (err) => {
					if (err) {
						console.error(err);
						return;
					}
				});
			}
			res.json({
				message: "Logo Updated Successfully",
			});
		})
		.catch((err) => res.json(err));
};
// update Banner
const updateBanner = (req, res, next) => {
	// res.send(req.file)
	let companyId = req.params.companyId;
	let oldBanner;
	Company.findById(companyId).then((response) => {
		oldBanner = response.banner;
	});

	Company.findByIdAndUpdate(companyId, {
		$set: {
			banner: req.file.path,
		},
	})
		.then(() => {
			if (req.file) {
				fs.unlink(oldBanner, (err) => {
					if (err) {
						console.error(err);
						return;
					}
				});
			}
			res.json({
				message: "Banner Updated Successfully",
			});
		})
		.catch((err) => res.json(err));
};
// delete by id

const destroy = (req, res, next) => {
	let companyId = req.params.companyId;
	Company.findById(companyId).then((response) => {
		(oldBanner = response.banner), (oldLogo = response.logo);
	});
	Company.findByIdAndDelete(companyId)
		.then(() => {
			fs.unlink(oldLogo, (err) => {
				if (err) {
					console.error(err);
					return;
				}
			});
			fs.unlink(oldBanner, (err) => {
				if (err) {
					console.error(err);
					return;
				}
			});
			res.json({
				message: "Company Deleted SuccessFully",
			});
		})
		.catch((err) => res.status(500).json({ message: "An Error Occured" }));
};

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
	updateLogo,
	updateBanner,
	showByCategory,
	showByTrending,
	recent,
	showBySlug
};
