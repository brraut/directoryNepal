const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;


const companySchema = new Schema({
   name: {type: String, required: true},
   slug: {type: String, required: true, unique: true},
   district: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Location'},
   address: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    optionalPhone: {type: String},
    webiste: {type: String},
    map: {type: String},
    rating: {type: Number},
    reviews : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Review'
        }
    ],
    category: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Category'},
    facebook: {type: String},
    instagram: {type: String},
    linkedIn: {type: String},
    youtube: {type: String},
    about: {type: String, required: true},
    status: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    logo: {type: String, required: true},
    banner: {type: String, required: true} 
},{timestamps: true})

companySchema.pre('validate', function(){
    if(this.name){
    this.slug = slugify(this.name, {lower: true, strict: true})
    }
    })

const Company = mongoose.model('Company', companySchema);

module.exports = Company;