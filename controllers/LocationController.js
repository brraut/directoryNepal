const slugify = require("slugify");

const Location = require("../models/Location.model");

const index = (req, res, next) => {
	Location.find()
		.then((response) => res.json(response))
		.catch((err) =>
			res.json({
				message: "Error Occured",
			})
		);
};
const show = (req, res, next)=>{
    let locationId = req.params.locationId;
    console.log(locationId);
    Location.findById(locationId)
    .then((response) => res.json(response))
    .catch((err) => res.json({
        message: err
    }))
}

const store = (req, res, next) => {
	let newLocation = new Location({
		name: req.body.name,
	});

	newLocation
		.save()
		.then(() =>
			res.json({
				message: "Location Saved Successfully",
			})
		)
		.catch((err) =>
			res.json({
				message: "Error Occured",
			})
		);
};

const update = (req, res, next) => {
	let locationId = req.params.locationId;

	Location.findByIdAndUpdate(locationId, {
		$set: {
			name: req.body.name,
			slug: slugify(req.body.name,  {lower: true, strict: true}),
		},
	})
		.then(() =>
			res.json({
				message: "Location Updated Succesfully",
			})
		)
		.catch((err) =>
			res.json({
				message: "Error Occured",
			})
		);
};

const destroy = (req, res, next) => {
	let locationId = req.params.locationId;

	Location.findByIdAndDelete(locationId)
		.then(() =>
			res.json({
				message: "Location Deleted Successfully",
			})
		)
		.catch((err) =>
			res.json({
				message: "Error Occured",
			})
		);
};

module.exports = { index, store, update, destroy , show};
