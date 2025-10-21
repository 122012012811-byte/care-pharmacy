const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all medicines
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM medicines');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get a single medicine by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM medicines WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ msg: 'Medicine not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;