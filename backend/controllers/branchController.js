const db = require('../config/db');

exports.getBranches = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tblbranch');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addBranch = async (req, res) => {
    const { BranchName, BranchContactnumber, BranchEmail, BranchAddress, BranchCity, BranchState, BranchPincode, BranchCountry } = req.body;
    try {
        await db.query(
            'INSERT INTO tblbranch (BranchName, BranchContactnumber, BranchEmail, BranchAddress, BranchCity, BranchState, BranchPincode, BranchCountry) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [BranchName, BranchContactnumber, BranchEmail, BranchAddress, BranchCity, BranchState, BranchPincode, BranchCountry]
        );
        res.status(201).json({ message: 'Branch added' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateBranch = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        await db.query('UPDATE tblbranch SET ? WHERE ID=?', [updates, id]);
        res.json({ message: 'Branch updated' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteBranch = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM tblbranch WHERE ID=?', [id]);
        res.json({ message: 'Branch deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};