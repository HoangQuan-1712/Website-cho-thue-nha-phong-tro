const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthController {
    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Tìm người dùng
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
            }

            // Kiểm tra mật khẩu
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
            }

            // Tạo JWT
            const token = jwt.sign(
                { userId: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );

            // Trả về thông tin người dùng và token
            res.json({
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }
}

module.exports = new AuthController();