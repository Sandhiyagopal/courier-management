const db = require('../config/db');

// Dashboard stats
exports.getStats = async (req, res) => {
    try {
        const [totalCourier] = await db.query('SELECT COUNT(*) as count FROM tblcourier');
        const [totalStaff] = await db.query('SELECT COUNT(*) as count FROM tblstaff');
        const [totalBranches] = await db.query('SELECT COUNT(*) as count FROM tblbranch');
        const [openComplaints] = await db.query('SELECT COUNT(*) as count FROM tblcomplains WHERE Status = "Open"');
        res.json({
            totalCourier: totalCourier[0].count,
            totalStaff: totalStaff[0].count,
            totalBranches: totalBranches[0].count,
            openComplaints: openComplaints[0].count
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Staff management
exports.getStaff = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tblstaff');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addStaff = async (req, res) => {
    const { BranchName, StaffName, StaffMobilenumber, StaffEmail, StaffPassword } = req.body;
    // const hashed = await bcrypt.hash(StaffPassword, 10);
    try {
        await db.query(
            'INSERT INTO tblstaff (BranchName, StaffName, StaffMobilenumber, StaffEmail, StaffPassword) VALUES (?, ?, ?, ?, ?)',
            [BranchName, StaffName, StaffMobilenumber, StaffEmail, StaffPassword]
        );
        res.status(201).json({ message: 'Staff added successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateStaff = async (req, res) => {
    const { id } = req.params;
    const { BranchName, StaffName, StaffMobilenumber, StaffEmail } = req.body;
    try {
        await db.query(
            'UPDATE tblstaff SET BranchName=?, StaffName=?, StaffMobilenumber=?, StaffEmail=? WHERE ID=?',
            [BranchName, StaffName, StaffMobilenumber, StaffEmail, id]
        );
        res.json({ message: 'Staff updated' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteStaff = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM tblstaff WHERE ID=?', [id]);
        res.json({ message: 'Staff deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};