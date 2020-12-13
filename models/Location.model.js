const mongoose = require("mongoose");
const slugify = require('slugify');

const Schema = mongoose.Schema;

const locationSchema = new Schema({
	name: { type: String, required: true },
	slug: { type: String, required: true, unique: true },
});
locationSchema.pre('validate', function(){
    if(this.name){
    this.slug = slugify(this.name, {lower: true, strict: true})
    }
    })
const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
