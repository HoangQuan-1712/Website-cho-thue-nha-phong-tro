const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authController = require('../app/controllers/AuthController');

// Đăng nhập
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Email không hợp lệ'),
        body('password').notEmpty().withMessage('Mật khẩu không được để trống')
    ],
    async (req, res, next) => {
        // Kiểm tra lỗi xác thực
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            // Gọi controller
            await authController.login(req, res);
        } catch (error) {
            next(error); // Pass errors to the global error handler
        }
    }
);

module.exports = router;