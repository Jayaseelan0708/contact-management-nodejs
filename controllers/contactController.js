const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

/**
 * @desc Get all contacts
 * @route GET /api/contacts
 * @access private
 */

const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

/**
 * @desc Crete a new contact
 * @route POST /contacts
 * @access private
 */

const createContact = asyncHandler(async (req, res) => {

    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error("All the field is mandatory");
    }
    const contacts = await Contact.create({ 
        name, 
        email, 
        phone,
        user_id: req.user.id
     });
    res.status(200).json(contacts);
});

/**
 * @desc Update a contact
 * @route PUT /contacts/:id
 * @access private
 */

const updateContact = asyncHandler(async (req, res) => {

    const contacts = await Contact.findById(req.params.id);
    if (!contacts) {
        res.status(404);
        throw new Error("Contact not found")
    }

    if(contacts.user_id.toString() !== req.user.id) {
        res.status(404);
        throw new Error("User don't have permission to update contact")
    }

    const updateContact = await Contact.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json(updateContact);
});

/**
 * @desc Get a contact
 * @route GET /contacts/:id
 * @access private
 */

const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.findById(req.params.id);
    if (!contacts) {
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contacts);
});

/**
 * @desc Delete contacts
 * @route DELETE /contacts/:id
 * @access private
 */

const deleteContact = asyncHandler(async (req, res) => {

    const contacts = await Contact.findById(req.params.id);
    if (!contacts) {
        res.status(404);
        throw new Error("Contact not found")
    }

    if(contacts.user_id.toString() !== req.user.id) {
        res.status(404);
        throw new Error("User don't have permission to delete contact")
    }

    const deleteContact = await Contact.findByIdAndDelete(req.params.id, req.body);
    res.status(200).json(deleteContact);
});

module.exports = {
    getAllContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
};