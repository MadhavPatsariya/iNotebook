const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const constants = require("../utilities/constants");
const user = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getUser = require("../middleware/getuser");
/**
 * Create new User
 */
router.post(
    "/create-user",
    [
        body("email", "Enter a valid email").isEmail(),
        body("name", "name should be of minimum length of 3").isLength({ min: 3 }),
        body("password", "password should be of minimum length of 5").isLength({
            min: 5,
        }),
    ],
    async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        var salt = await bcrypt.genSaltSync(10);
        var securedPassword = await bcrypt.hashSync(request.body.password, salt);
        var doesExists = await user.findOne({ email: request.body.email });
        if (doesExists) {
            return response.json({
                error: "Error Occurred",
                message: "Sorry, user with this email already exists",
            });
        } else {
            user
                .create({
                    name: request.body.name,
                    email: request.body.email,
                    password: securedPassword,
                })
                .then((user) => {
                    var data = {
                        user: {
                            id: user.id,
                        },
                    };
                    var authToken = jwt.sign(data, constants.JWT_SECRET);
                    return response.json({ authToken });
                })
                .catch((error) => {
                    console.log("Error:" + error.message);
                    return response.json({
                        error: "Error occurred ",
                        message: error.message,
                    });
                });
        }
    }
);

/**
 * Authenticate a user
 */
router.post(
    "/login",
    [
        body("email", "Please enter a valid email").isEmail(),
        body("password", "Password cannot be blank").exists(),
    ],
    async (request, response) => {
        var errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        try {
            const { email, password } = request.body;
            var userExists = await user.findOne({ email: email });
            if (!userExists) {
                return response
                    .status(400)
                    .json({
                        error:
                            "User with this email does not exists, trying signing up first",
                    });
            }
            var isPasswordValidated = await bcrypt.compare(
                password,
                userExists.password
            );
            if (!isPasswordValidated) {
                return response.status(400).json({ error: "Incorrect Password" });
            }
            var data = {
                user: {
                    id: userExists.id,
                },
            };
            var authToken = jwt.sign(data, constants.JWT_SECRET);
            return response.json({ authToken });
        } catch (error) {
            console.log(`error: ${error.message}`)
            response.status(502);
        }
    }
);

/**
 * Get user using JWT
 */
router.post("/get-user-details", getUser, async (request, response) => {
    try {
        var currentUser = await user.findById(request.user.id).select("-password");
        return response.status(200).json({ user: currentUser });
    } catch (error) {
        console.log(`Error: ${error.message}`)
        return response.status(501)
    }
})
module.exports = router;
