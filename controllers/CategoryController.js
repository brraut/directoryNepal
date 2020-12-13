const Category = require('../models/category.model');
const slugify = require('slugify');

// to show Category data
const index = (req, res, next)=>{
    Category.find()
    .then(response => res.json(response))
    .catch(err => res.json(
        {
            message:"Error Occured"
        }
    ))
}
const store = (req, res, next) =>{
    let newCategory = new Category({
        name : req.body.name,
        type: req.body.type,
        icon: req.body.icon

    })

    newCategory.save()
    .then(response=>res.json({
        message: "SuccessFully Created"
    }))
    .catch(err=>res.json({
        message: "Error Occured"
    }))
}
const show = (req, res, next)=>{
    let categoryId = req.params.categoryId;
    console.log(categoryId);
    Category.findById(categoryId)
    .then((response) => res.json(response))
    .catch((err) => res.json({
        message: err
    }))
}
const update = (req, res, next)=>{
    let categoryId = req.params.categoryId;
    
    Category.findByIdAndUpdate(categoryId, {$set: {
        name: req.body.name,
        type: req.body.type,
        icon: req.body.icon,
        slug: slugify(req.body.name,  {lower: true, strict: true})

    }})
    .then(response=>res.json({
        message: "Category Updated Successfully"
    }))
    .catch(err=>res.json({
        message: "Error Occured"
    }))
}

const destroy = (req,res, next)=>{
    let categoryId = req.params.categoryId;

    Category.findByIdAndDelete(categoryId)
    .then(response=>res.json({
        message: "Category Deleted Successfully"
    }))
    .catch(err=>res.json({
        message: "Erroe Occured while deleting Category"
    }))
}

module.exports = { index, store, update, destroy, show};