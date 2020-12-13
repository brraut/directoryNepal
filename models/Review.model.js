const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ReviewSchema = new Schema({
    companyId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Company'},
    userId : {type: mongoose.Schema.Types.ObjectId, required:true, ref: 'User'},
    review: {type: String, required: true},
})

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;