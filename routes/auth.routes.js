const { Router } = require("express");
const bcrypt = require("bcryptjs");
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

            if (errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect data during registration",
                });
            }

            const { email, password, name } = req.body;
            const candidate = await User.findOne({ email });

            if (candidate) {
                return res.status(400).json({ message: "The user already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ email, password: hashedPassword, name });

            await user.save();

            res.status(201).json({ message: "User created" });
        } catch (error) {
            res.status(500).json({ message: "Something went wrong, try again" });
        }
    }
);

// /api/auth/login
router.post("/login", async (req, res) => {});

module.exports = router;
