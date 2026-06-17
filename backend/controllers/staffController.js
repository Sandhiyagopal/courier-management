const db = require('../config/db');

exports.getNewCouriers = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM tblcourier WHERE Status = 'Booked' ORDER BY CourierDate DESC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteCourier = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM tblcouriertracking WHERE CourierId = ?', [id]);
        await db.query('DELETE FROM tblcourier WHERE ID = ?', [id]);
        res.json({ message: 'Courier deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCourierById = async (req, res) => {
    const { id } = req.params;
    try {
        const [courier] = await db.query('SELECT * FROM tblcourier WHERE ID = ?', [id]);
        if (courier.length === 0) return res.status(404).json({ message: 'Not found' });
        const [tracking] = await db.query('SELECT * FROM tblcouriertracking WHERE CourierId = ? ORDER BY StatusDate DESC', [id]);
        res.json({ courier: courier[0], tracking });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};