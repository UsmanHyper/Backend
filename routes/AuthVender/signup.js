const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Vender = require("../../models/vander/add_vander.js");
const { validateUserData } = require("../../middleware/signUpValidation.js");
const { sendEmail } = require("../../middleware/sendEmail.js");
require('dotenv').config();

const validator = require('validator');
const Vander = require('../../models/vander/add_vander.js');


const saveVendor = async (venderData, res) => {
    try {
        let email, number;
        if (validator.isEmail(venderData.contactInfo)) {
            email = venderData.contactInfo;
            venderData.email = email;
        } else if (validator.isNumeric(venderData.contactInfo)) {
            number = venderData.contactInfo;
            venderData.number = number;
        } else {
            return res.status(400).json({ error: 'Invalid Email or Number' });
        }

        const hashedPassword = await bcrypt.hash(venderData.password, 8);

        const newVendor = new Vender({
            email: venderData.email,
            number: venderData.number,
            password: hashedPassword,
            catagory: venderData.catagory,
        });
        
        if (venderData.email) {
            const username = venderData.email ? venderData.email : "";
            // Send sign-up email
            await sendEmail(venderData.email, 'signUp', { username: venderData?.email, userpassword: venderData.password });
        }

        const savedVendor = await newVendor.save();

        res.status(200).json({
            status: 200,
            data: {
                vendorId: savedVendor._id,
                email: savedVendor.email,
                services: savedVendor.catagory
            },
            message: 'Vendor has been created',
        });
    } catch (error) {
        console.error('Save Vendor Error:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error during vendor creation' });
    }
};


router.post("/", validateUserData, async (req, res) => {
    try {
        const vendorData = req.body;

        // Check if either email or number is already in use
        const existingVendor = await Vander.findOne({
            $or: [
                { email: vendorData.email },
                { number: vendorData.number },
            ]
        });

        if (existingVendor) {
            return res.status(400).json({ status: 400, error: 'Email or number is already in use' });
        }

        await saveVendor(vendorData, res);
    } catch (error) {
        console.error('Validation or Signup Error:', error);
        res.status(400).json({ status: 400, error: 'Validation failed or internal error' });
    }
});

module.exports = router;