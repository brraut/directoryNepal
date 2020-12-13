const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    companyId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Company'},
    rating: {type: Number, required: true}
},{timestamps: true})

const Rating = mongoose.model('Rating' , RatingSchema);

module.exports = Rating;