require('dotenv').config();

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const validatePropertyInput = require('../../validation/property');

// Load User model
const Property = require('../../models/Property');
const User = require('../../models/User');

const cloud = require('../../config/cloudinary');
const upload = require('../../config/multer');

// Authorize Requests
const authorize = require('../../validation/authorize');

// @route GET api/properties
// @desc Get properties
// @access Public
router.get('/', (req, res) => {
    let options = {};
    if (req.query.sortByPrice) {
        options.sort = {
            price: req.query.sortByPrice === 'asc' ? 1 : -1,
        };
    }
    if (req.query.limit) {
        options.limit = Number(req.query.limit);
    }

    let filters = {};
    if (req.query.minPrice) {
        filters = {
            price: {
                $gte: Number(req.query.minPrice),
            },
        };
    }
    if (req.query.maxPrice) {
        filters = {
            price: {
                $lte: Number(req.query.maxPrice),
            },
        };
    }
    if (req.query.maxPrice && req.query.minPrice) {
        filters = {
            price: {
                $gte: Number(req.query.minPrice),
                $lte: Number(req.query.maxPrice),
            },
        };
    }
    Property.find(filters, {}, options)
        .populate('user_id', 'name')
        .populate('image', 'image_url')
        .exec((err, properties) => {
            if (err)
                return res
                    .status(404)
                    .json({ error: "Can't get user details!" });
            res.status(200).json(properties);
            return;
        });
});

// @route GET api/properties/:id
// @desc Get properties
// @access Public
router.get('/:id', (req, res) => {
    Property.findById(req.params.id)
        .populate('user_id', 'name')
        .populate('image', 'image_url')
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
router.post('/', authorize, upload, (req, res) => {
    // Form validation
    const { errors, isValid } = validatePropertyInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    jwt.verify(req.token, process.env.HASH_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({
                error: "You're not authorized!",
                status: 403,
            });
        } else {
            const filePaths = req.files.map(i => i.path);
            cloud.uploads(filePaths).then(result => {
                console.log(result);
                res.json({
                    data: result,
                });
                // const newProperty = new Property({
                //     name: req.body.name,
                //     price: req.body.price,
                //     images: result,
                //     location: req.body.location,
                //     specs: req.body.specs,
                //     user_id: user.id,
                // });
                // newProperty
                //     .save()
                //     .then(property => {
                //         User.findByIdAndUpdate(
                //             {
                //                 _id: user.id,
                //             },
                //             {
                //                 $push: {
                //                     properties: property.id,
                //                 },
                //             },
                //             {
                //                 new: true,
                //             },
                //         ).then(() => {});
                //         res.json(property);
                //     })
                //     .catch(err => console.log(err));
            });
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
                    ...(req.body.name && {
                        name: req.body.name,
                    }),
                    ...(req.body.price && {
                        price: req.body.price,
                    }),
                    ...(req.body.image && {
                        image: req.body.image,
                    }),
                    ...(req.body.specs && {
                        specs: req.body.specs,
                    }),
                    ...(req.body.location && {
                        location: req.body.location,
                    }),
                    updatedAt: Date.now(),
                };
                Property.findByIdAndUpdate(
                    {
                        _id: req.params.id,
                    },
                    {
                        $set: updatedData,
                    },
                    {
                        new: true,
                    },
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
