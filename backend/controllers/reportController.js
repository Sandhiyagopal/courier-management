const db = require('../config/db');

exports.getCourierReport = async (req, res) => {
  const { fromDate, toDate } = req.query;
  const [rows] = await db.query(
    'SELECT * FROM tblcourier WHERE DATE(CourierDate) BETWEEN ? AND ? ORDER BY CourierDate DESC',
    [fromDate, toDate]
  );
  res.json(rows);
};

exports.getRequestCount = async (req, res) => {
  const { fromDate, toDate } = req.query;
  const [couriers] = await db.query('SELECT COUNT(*) as total FROM tblcourier WHERE DATE(CourierDate) BETWEEN ? AND ?', [fromDate, toDate]);
  const [enquiries] = await db.query('SELECT COUNT(*) as total FROM tblcontact WHERE DATE(MsgDate) BETWEEN ? AND ?', [fromDate, toDate]);
  const [complaints] = await db.query('SELECT COUNT(*) as total FROM tblcomplains WHERE DATE(CompDate) BETWEEN ? AND ?', [fromDate, toDate]);
  res.json({
    totalCouriers: couriers[0].total,
    totalEnquiries: enquiries[0].total,
    totalComplaints: complaints[0].total
  });
};

exports.getSalesReport = async (req, res) => {
  const { fromDate, toDate } = req.query;
  const [rows] = await db.query(
    'SELECT COUNT(*) as totalCouriers, SUM(CAST(ParcelPrice AS DECIMAL(10,2))) as totalSales FROM tblcourier WHERE DATE(CourierDate) BETWEEN ? AND ?',
    [fromDate, toDate]
  );
  res.json({
    totalCouriers: rows[0].totalCouriers || 0,
    totalSales: rows[0].totalSales || 0
  });
};