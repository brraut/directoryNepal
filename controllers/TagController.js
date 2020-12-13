const slugify = require("slugify");
const Tag = require("../models/tag.model");
const Category = require("../models/category.model");

// to show all the tags
const index = (req, res, next) => {
	let catId = req.params.catId;
	Tag.find({categoryId : catId})
		.then((response) => res.json(response))
		.catch((err) =>
			res.json({
				message: "Error Occured",
			})
		);
};
const show = (req, res, next)=>{
    let tagId = req.params.tagId;
    console.log(tagId);
    Tag.findById(tagId)
    .then((response) => res.json(response))
    .catch((err) => res.json({
        message: err
    }))
}

const store = (req, res, next) => {
	let newTag = new Tag({
		name: req.body.name,
		categoryId: req.body.categoryId,
	});

	newTag
		.save()
		.then( async (response) =>{
			await Category.findByIdAndUpdate(req.body.categoryId, {
				$push : {
					tags: response._id
				}
			});
			res.json({
				message: "Tag Saved Successfully",
			})
		}
			
		)
		.catch((err) =>
			res.json({
				message: "Error Occured",
			})
		);
};

const update = (req, res, next) => {
	let tagId = req.params.tagId;
	Tag.findByIdAndUpdate(tagId, {
		$set: {
			name: req.body.name,
			slug: slugify(req.body.name,  {lower: true, strict: true}),
		},
	})
		.then((res) =>
			res.json({
				message: "Tag Updated Successfully",
			})
		)
		.catch((err) =>
			res.json({
				message: "Error Occured",
			})
		);
};

const destroy = (req, res, next) => {
	let tagId = req.params.tagId;
	Tag.findByIdAndDelete(tagId)
		.then(() =>
			res.json({
				message: "Tag Deleted Successfully",
			})
		)
		.catch((res) =>
			res.json({
				message: "Error Occcured",
			})
		);
};

module.exports = { index, store, update, destroy, show };
