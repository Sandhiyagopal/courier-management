const db = require('../config/db');

exports.submitEnquiry = async (req, res) => {
    const { Name, MobileNumber, Email, Message } = req.body;
    try {
        await db.query(
            'INSERT INTO tblcontact (Name, MobileNumber, Email, Message) VALUES (?, ?, ?, ?)',
            [Name, MobileNumber, Email, Message]
        );
        res.status(201).json({ message: 'Enquiry sent' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getEnquiries = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tblcontact ORDER BY MsgDate DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};