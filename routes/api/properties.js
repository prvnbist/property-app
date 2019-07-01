require('dotenv').config();

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const validatePropertyInput = require('../../validation/property');

// Load User model
const Property = require('../../models/Property');
const User = require('../../models/User');

// Authorize Requests
const authorize = require('../../validation/authorize');

// @route GET api/properties
// @desc Get properties
// @access Public
router.get('/', (req, res) => {
    Property.find({})
        .populate('user_id', 'name')
        .exec((err, properties) => {
            if (err)
                return res
                    .status(404)
                    .json({ error: "Can't get user details!" });
            res.status(200).json(properties);
        });
});

// @route POST api/properties
// @desc Add property
// @access Protected
router.post('/', authorize, (req, res) => {
    // Form validation
    const { errors, isValid } = validatePropertyInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    jwt.verify(req.token, process.env.HASH_SECRET, (err, user) => {
        if (err) {
            //If error send Forbidden (403)
            console.log(
                'ERROR: Could not connect to the protected route',
            );
            res.status(403).json({
                error: "You're not authorized!",
                status: 403,
            });
        } else {
            const newProperty = new Property({
                name: req.body.name,
                price: req.body.price,
                user_id: user.id,
            });
            newProperty
                .save()
                .then(property => {
                    User.findByIdAndUpdate(
                        { _id: user.id },
                        { $push: { properties: property.id } },
                        { new: true },
                    ).then(() => {});
                    res.json(property);
                })
                .catch(err => console.log(err));
        }
    });
});

// @route PUT api/properties
// @desc Update property
// @access Protected
router.put('/:id', authorize, (req, res) => {
    jwt.verify(req.token, process.env.HASH_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({
                error: "You're not authorized!",
                status: 403,
            });
        }
        Property.findById(req.params.id).then(property => {
            if (property.user_id + '' === user.id) {
                const updatedData = {
                    ...(req.body.name && { name: req.body.name }),
                    ...(req.body.price && { price: req.body.price }),
                    updatedAt: Date.now(),
                };
                Property.findByIdAndUpdate(
                    {
                        _id: req.params.id,
                    },
                    { $set: updatedData },
                    { new: true },
                ).then(_ =>
                    res.status(200).json({
                        message: 'Property details has been updated!',
                        status: 200,
                    }),
                );
            } else {
                res.status(403).json({
                    error: "You're not authorized!",
                    status: 403,
                });
            }
        });
    });
});

// @route DELETE api/properties
// @desc Delete property
// @access Protected
router.delete('/:id', authorize, (req, res) => {
    jwt.verify(req.token, process.env.HASH_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({
                error: "You're not authorized!",
                status: 403,
            });
        }
        Property.findById(req.params.id).then(property => {
            if (property.user_id + '' === user.id) {
                Property.findByIdAndDelete({
                    _id: req.params.id,
                }).then(_ =>
                    res.status(200).json({
                        message: 'Property has been deleted!',
                        status: 200,
                    }),
                );
            } else {
                res.status(403).json({
                    error: "You're not authorized!",
                    status: 403,
                });
            }
        });
    });
});

module.exports = router;
