const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required:true, unique: true},
    phone: {type: String },
    password: {type: String},
    activated: {type:Boolean},
})

const User = mongoose.model('User', userSchema);

module.exports = User;