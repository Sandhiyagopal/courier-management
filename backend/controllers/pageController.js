const db = require('../config/db');

exports.getPage = async (req, res) => {
    const { type } = req.params; // aboutus or contactus
    try {
        const [rows] = await db.query('SELECT * FROM tblpage WHERE PageType = ?', [type]);
        res.json(rows[0] || {});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updatePage = async (req, res) => {
    const { type } = req.params;
    const { PageTitle, PageDescription, Email, MobileNumber, Address } = req.body;
    try {
        await db.query(
            'UPDATE tblpage SET PageTitle=?, PageDescription=?, Email=?, MobileNumber=?, Address=? WHERE PageType=?',
            [PageTitle, PageDescription, Email, MobileNumber, Address, type]
        );
        res.json({ message: 'Page updated' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};