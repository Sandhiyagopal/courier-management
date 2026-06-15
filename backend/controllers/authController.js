const db = require('../config/db');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { username, password, role } = req.body;
    console.log('Request body:', req.body);
    console.log('Headers:', req.headers);
    try {
        console.log("Login Request:", username, role);

        // Before query
        console.log("Executing query...");
        let user;
        if (role === 'admin') {
            const [rows] = await db.query('SELECT * FROM tbladmin WHERE UserName = ?', [username]);
            user = rows[0];
        } else if (role === 'staff') {
            const [rows] = await db.query('SELECT * FROM tblstaff WHERE StaffEmail = ?', [username]);
            user = rows[0];
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }

        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        // const isMatch = await bcrypt.compare(password, user.Password);
        // if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user.ID, role, name: user.StaffName || user.AdminName },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, role, name: user.StaffName || user.AdminName });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};