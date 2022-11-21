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
                    message: "Неверные данные при регистрации",
                });
            }

            const { email, password, name, createDate, loginDate, isBlocked, isChecked } = req.body;
            const candidate = await User.findOne({ email });

            if (candidate) {
                return res
                    .status(400)
                    .json({ message: "Пользователь с таким email уже существует" });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({
                email,
                password: hashedPassword,
                name,
                createDate,
                loginDate,
                isBlocked,
                isChecked,
            });

            await user.save();

            res.status(201).json({ message: "Пользователь создан, нажмите кнопку 'Войти'" });
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
                    message: "Неверные данные при входе в систему",
                });
            }

            const { email, password, loginDate } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res
                    .status(400)
                    .json({ message: "Пользователь не найден, зарегистрируйтесь" });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: "Неверный пароль, попробуйте еще раз" });
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
