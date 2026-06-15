const db = require('../config/db');

// User raises complaint (public)
exports.raiseComplaint = async (req, res) => {
    const { TrackingNumber, NatureOfComplain, IssuesDesc } = req.body;
    const TicketNumber = Math.floor(Math.random() * 1000000);
    try {
        await db.query(
            'INSERT INTO tblcomplains (TicketNumber, TrackingNumber, NatureOfComplain, IssuesDesc, Status) VALUES (?, ?, ?, ?, ?)',
            [TicketNumber, TrackingNumber, NatureOfComplain, IssuesDesc, 'Open']
        );
        res.status(201).json({ message: 'Complaint registered', TicketNumber });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Admin view complaints
exports.getComplaints = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tblcomplains ORDER BY CompDate DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Admin resolve complaint
exports.resolveComplaint = async (req, res) => {
    const { id } = req.params;
    const { Remark } = req.body;
    try {
        await db.query('UPDATE tblcomplains SET Status="Closed", Remark=? WHERE ID=?', [Remark, id]);
        res.json({ message: 'Complaint resolved' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// User check complaint status (public)
exports.checkComplaintStatus = async (req, res) => {
    const { ticketNo } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM tblcomplains WHERE TicketNumber = ?', [ticketNo]);
        if (rows.length === 0) return res.status(404).json({ message: 'Not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};