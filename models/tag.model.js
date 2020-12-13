const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const tagSchema = new Schema({
    name: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    categoryId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Category'}
});
tagSchema.pre('validate', function(){
    if(this.name){
    this.slug = slugify(this.name, {lower: true, strict: true})
    }
    })
const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;