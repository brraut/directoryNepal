const Review = require('../models/Review.model');
const Company = require('../models/Company.model');
const index = (req, res, next) => {
    Review.find()
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err));
}

const store = (req, res, next) =>{
    
    const newReview = new Review({
        companyId : req.body.companyId,
        userId: req.body.userId,
        review: req.body.review
    })

    newReview.save()
    .then( async (response) =>{
        console.log(response)
        await Company.findByIdAndUpdate(req.body.companyId, {
            $push : {
                reviews: response._id
            }
        });
        res.json({
            message: "Review Saved Successfully",
        })
    }
        
    )
    .catch((err) => console.log(err));
}

const update = (req, res, next) =>{

    let reviewId = req.params.reviewId;
    
    Review.findByIdAndUpdate(reviewId, {review: req.body.review})
    .then(() => res.json({
        message: "Review Updated Successfully"
    }))
    .catch((err) => res.status(500).json(err));
}
module.exports = {index, store, update};