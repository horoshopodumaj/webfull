const { Router } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = Router();

// /api/auth/register
router.post("/register", async (req, res) => {
    try {
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
});

// /api/auth/login
router.post("/login", async (req, res) => {});

module.exports = router;
