const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name : {type: String, required: true},
    slug : {type: String, required: true, unique: true},
    type : {type: String, required: true},
    icon : {type: String, required: true},
    tags : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Tag'
        }
    ]
    
})
categorySchema.pre('validate', function(){
    if(this.name){
    this.slug = slugify(this.name, {lower: true, strict: true})
    }
    })
    
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;