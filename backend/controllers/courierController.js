const db = require('../config/db');

// Staff adds courier
exports.addCourier = async (req, res) => {
    const courier = req.body;
    const refNumber = 'CMS' + Date.now();
    try {
        const [result] = await db.query(
            `INSERT INTO tblcourier 
            (RefNumber, SenderBranch, SenderName, SenderContactnumber, SenderAddress, SenderCity, SenderState, SenderPincode, SenderCountry,
             RecipientName, RecipientContactnumber, RecipientAddress, RecipientCity, RecipientState, RecipientPincode, RecipientCountry,
             CourierDesv, ParcelWeight, ParcelDimensionlon, ParcelDimensionwidth, ParcelDimensionheight, ParcelPrice, Status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [refNumber, courier.SenderBranch, courier.SenderName, courier.SenderContactnumber, courier.SenderAddress,
             courier.SenderCity, courier.SenderState, courier.SenderPincode, courier.SenderCountry,
             courier.RecipientName, courier.RecipientContactnumber, courier.RecipientAddress, courier.RecipientCity,
             courier.RecipientState, courier.RecipientPincode, courier.RecipientCountry,
             courier.CourierDesv, courier.ParcelWeight, courier.ParcelDimensionlon, courier.ParcelDimensionwidth,
             courier.ParcelDimensionheight, courier.ParcelPrice, 'Booked']
        );
        
        // Add initial tracking
        await db.query(
            'INSERT INTO tblcouriertracking (CourierId, remark, status) VALUES (?, ?, ?)',
            [result.insertId, 'Courier booking created', 'Booked']
        );
        
        res.status(201).json({ message: 'Courier booked', refNumber });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update courier status (Staff)
// Update courier status (Staff)
exports.updateStatus = async (req, res) => {
    const { id } = req.params;   // This may be RefNumber (e.g., 'CR123456') or numeric ID
    const { status, remark } = req.body;

    if (!status) {
        return res.status(400).json({ message: 'Status is required' });
    }

    try {
        let query, params;
        
        // Check if id is numeric (integer) or alphanumeric (reference number)
        if (/^\d+$/.test(id)) {
            // Numeric ID
            query = 'UPDATE tblcourier SET Status=? WHERE ID=?';
            params = [status, id];
        } else {
            // Reference number (like CR123456)
            query = 'UPDATE tblcourier SET Status=? WHERE RefNumber=?';
            params = [status, id];
        }

        const [result] = await db.query(query, params);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Courier not found' });
        }

        // Need CourierId for tracking. If we used RefNumber, fetch the ID first.
        let courierId;
        if (/^\d+$/.test(id)) {
            courierId = id;
        } else {
            const [rows] = await db.query('SELECT ID FROM tblcourier WHERE RefNumber = ?', [id]);
            if (rows.length === 0) return res.status(404).json({ message: 'Courier not found' });
            courierId = rows[0].ID;
        }

        // Insert tracking record
        await db.query(
            'INSERT INTO tblcouriertracking (CourierId, remark, status) VALUES (?, ?, ?)',
            [courierId, remark || 'Status updated', status]
        );

        res.json({ message: 'Status updated successfully' });
    } catch (err) {
        console.error('Update status error:', err);
        res.status(500).json({ message: err.message });
    }
};

// Public tracking
exports.trackCourier = async (req, res) => {
    const { refNumber } = req.params;
    try {
        const [courier] = await db.query('SELECT * FROM tblcourier WHERE RefNumber = ?', [refNumber]);
        if (courier.length === 0) return res.status(404).json({ message: 'Not found' });
        
        const [tracking] = await db.query('SELECT * FROM tblcouriertracking WHERE CourierId = ? ORDER BY StatusDate DESC', [courier[0].ID]);
        res.json({ courier: courier[0], tracking });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Staff search
exports.searchCourier = async (req, res) => {
    const { refNumber } = req.query;
    try {
        const [rows] = await db.query('SELECT * FROM tblcourier WHERE RefNumber LIKE ?', [`%${refNumber}%`]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Admin view all couriers
exports.getAllCouriers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tblcourier ORDER BY CourierDate DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};