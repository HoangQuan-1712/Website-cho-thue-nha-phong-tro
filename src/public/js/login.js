document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Lưu token và thông tin người dùng vào localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Chuyển hướng theo vai trò
            switch (data.user.role) {
                case 'admin':
                    window.location.href = '/admin/dashboard';
                    break;
                case 'landlord':
                    window.location.href = '/landlord/dashboard';
                    break;
                default:
                    window.location.href = '/user/dashboard';
            }
        } else {
            alert(data.message || 'Đăng nhập thất bại');
        }
    } catch (error) {
        alert('Lỗi hệ thống, vui lòng thử lại');
    }
});