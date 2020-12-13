const Rating = require("../models/Rating.model");
const Company = require("../models/Company.model");

const index = (req, res, next) => {
	Rating.find()
		.then((response) => res.json(response))
		.catch((err) => res.status(500).json(err));
};
const show = (req, res, next) =>{
     
    Rating.find({ companyId: req.params.companyId, userId: req.params.userId })
        .then((response) => res.json(response))
        .catch((err) => console.log(err));
}
const store = (req, res, next) => {
	const newRating = new Rating({
		userId: req.body.userId,
		companyId: req.body.companyId,
		rating: Number(req.body.rating),
	});
	Rating.find({ companyId: req.body.companyId, userId: req.body.userId })
		.then((response) => {
			if (response.length == 0) {
				newRating
					.save()
					.then(async () => {
						await Rating.find({ companyId: req.body.companyId }).then(
							(response) => {
								let rating = 0;
								let count = 0;
								response.forEach((data) => {
									rating += data.rating;
									if (data.rating != null) {
										count++;
									}
								});
								let avgRating = rating / count;
								Company.findByIdAndUpdate(req.body.companyId, {
									rating: Number(avgRating),
								})
									.then(() => {
										res.json({
											message: "Successfully Updated",
										});
									})
									.catch((err) => res.json(err));
							}
						);
					})
					.catch((err) => res.status(500).json(err));
			} else {
                console.log('response', req.body.companyId,response[0]);
                	Rating.findByIdAndUpdate(response[0]._id, {rating: Number(req.body.rating)})
					.then(async () => {
						await Rating.find({ companyId: req.body.companyId }).then(
							(response) => {
								let rating = 0;
								let count = 0;
								response.forEach((data) => {
									rating += data.rating;
									if (data.rating != null) {
										count++;
									}
								});
								let avgRating = rating / count;

								Company.findByIdAndUpdate(req.body.companyId, {
									rating: Number(avgRating),
								})
									.then(async(response) => {
										res.json({
											message: "Successfully Updated",
										});
									})
									.catch((err) => res.json(err));
							}
						);
					})
					.catch((err) => res.status(500).json(err));
			}
		})
		.catch((err) => res.status(500).json(err));
};

module.exports = { store, index, show };
