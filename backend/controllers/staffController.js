const db = require('../config/db');

exports.getNewCouriers = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM tblcourier WHERE Status = 'Booked' ORDER BY CourierDate DESC");
  res.json(rows);
};

exports.deleteCourier = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM tblcouriertracking WHERE CourierId = ?', [id]);
  await db.query('DELETE FROM tblcourier WHERE ID = ?', [id]);
  res.json({ message: 'Deleted' });
};

exports.getCourierById = async (req, res) => {
  const { id } = req.params;
  const [rows] = await db.query('SELECT * FROM tblcourier WHERE ID = ?', [id]);
  if (rows.length === 0) return res.status(404).json({ message: 'Not found' });
  const [tracking] = await db.query('SELECT * FROM tblcouriertracking WHERE CourierId = ? ORDER BY StatusDate DESC', [id]);
  res.json({ courier: rows[0], tracking });
};