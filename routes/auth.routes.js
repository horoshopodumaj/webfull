const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

// /api/auth/register
router.post(
    "/register",
    [
        check("email", "Incorrect email").isEmail(),
        check("password", "The minimum password length is 1 character").isLength({ min: 1 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect data during registration",
                });
            }

            const { email, password, name, createDate, loginDate } = req.body;
            const candidate = await User.findOne({ email });

            if (candidate) {
                return res.status(400).json({ message: "The user already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ email, password: hashedPassword, name, createDate, loginDate });

            await user.save();

            res.status(201).json({ message: "User created" });
        } catch (error) {
            res.status(500).json({ message: "Something went wrong, try again" });
        }
    }
);

// /api/auth/login
router.post(
    "/login",
    [
        check("email", "Enter the correct email").isEmail(),
        check("password", "Enter the password").exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect data when logging in",
                });
            }

            const { email, password, loginDate } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: "Invalid password, try again" });
            }

            const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
                expiresIn: "1h",
            });

            await User.findOneAndUpdate({ email }, { loginDate });

            res.json({ token, userId: user.id });
        } catch (error) {
            res.status(500).json({ message: "Something went wrong, try again" });
        }
    }
);

module.exports = router;
