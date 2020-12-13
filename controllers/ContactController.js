const Contact = require('../models/contact.model');


// to show whole data
const index = (req, res, next)=>{
    Contact.find()
    .then(response=>res.json(response))
    .catch(err=>res.json({
        message:"Error Occured"
    }))
}

const show = (req, res, next)=>{
    let contactId = req.params.contactId;
    Contact.findById(contactId)
    .then(response=>res.json(response))
    .catch(err=>response.json({
        message: "Error Occured, Id mismatch "
    }))
}
const store = (req, res, next)=>{
    const newContact = new Contact({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    })

    newContact.save()
    .then(()=>res.json({
        message: "Successfully Sent"
    }))
    .catch(err=>res.json({
        message: "Error Occured! Failed"
    }))
}
const destroy = (req, res, next)=>{
    let contactId = req.params.contactId;
    Contact.findByIdAndDelete(contactId)
    .then(()=>res.json({
        message: "Successfully Deleted"
    }))
    .catch(err=>res.json({
        message: "Error Occured"
    }))
}

module.exports = {
    index, show, store, destroy
}