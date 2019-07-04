require('dotenv').config();

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Authorize Requests
const authorize = require('../../validation/authorize');

// Load models
const User = require('../../models/User');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res
                .status(400)
                .json({ error: 'Email already exists' });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => {
                            // Create JWT Payload
                            const payload = {
                                id: user.id,
                                name: user.name,
                            };
                            // Sign token
                            jwt.sign(
                                payload,
                                process.env.HASH_SECRET,
                                {
                                    expiresIn: 24 * 60 * 60 * 1000,
                                },
                                (err, token) => {
                                    res.json({
                                        success: true,
                                        token: 'Bearer ' + token,
                                    });
                                },
                            );
                        })
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res
                .status(404)
                .json({
                    error: 'Incorrect email or password!',
                    status: 404,
                });
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name,
                };

                // Sign token
                jwt.sign(
                    payload,
                    process.env.HASH_SECRET,
                    {
                        expiresIn: 24 * 60 * 60 * 1000,
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token,
                        });
                    },
                );
            } else {
                return res.status(400).json({
                    error: 'Incorrect email or password!',
                    status: 400,
                });
            }
        });
    });
});

// @route GET api/users/:id
// @desc Get a user
// @access Protected
router.get('/:id', authorize, (req, res) => {
    jwt.verify(req.token, process.env.HASH_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({
                error: "You're not authorized!",
                status: 403,
            });
        }
        User.findById(req.params.id)
            .populate('properties')
            .exec((err, doc) => {
                if (err)
                    return res.status(404).json({
                        error: "Can't get properties list!",
                    });
                res.status(200).json(doc);
            });
    });
});

module.exports = router;
