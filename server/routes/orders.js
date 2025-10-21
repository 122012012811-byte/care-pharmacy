const express = require('express');
const router = express.Router();
const pool = require('../db');

// Place a new order
router.post('/', async (req, res) => {
  const { customer_name, customer_email, customer_phone, total_amount, items } = req.body;

  if (!customer_name || !customer_email || !total_amount || !items || items.length === 0) {
    return res.status(400).json({ msg: 'Please enter all required fields and include order items' });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // Insert into orders table
    const [orderResult] = await connection.query(
      'INSERT INTO orders (customer_name, customer_email, customer_phone, total_amount) VALUES (?, ?, ?, ?)',
      [customer_name, customer_email, customer_phone, total_amount]
    );
    const orderId = orderResult.insertId;

    // Insert into order_items table and update medicine stock
    for (const item of items) {
      const { medicine_id, name, price, quantity } = item;
      if (!medicine_id || !name || !price || !quantity) {
        throw new Error('Invalid item in order');
      }

      // Check stock
      const [medicineRows] = await connection.query('SELECT stock FROM medicines WHERE id = ?', [medicine_id]);
      if (medicineRows.length === 0 || medicineRows[0].stock < quantity) {
        throw new Error(`Insufficient stock for medicine ID ${medicine_id}`);
      }

      await connection.query(
        'INSERT INTO order_items (order_id, medicine_id, name, price, quantity) VALUES (?, ?, ?, ?, ?)',
        [orderId, medicine_id, name, price, quantity]
      );

      // Update stock
      await connection.query('UPDATE medicines SET stock = stock - ? WHERE id = ?', [quantity, medicine_id]);
    }

    await connection.commit();
    res.status(201).json({ msg: 'Order placed successfully', orderId });

  } catch (err) {
    if (connection) await connection.rollback();
    console.error(err);
    res.status(500).send('Server Error: ' + err.message);
  } finally {
    if (connection) connection.release();
  }
});

// Get all orders (for admin/testing purposes)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM orders');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get a single order with its items
router.get('/:id', async (req, res) => {
  try {
    const [orderRows] = await pool.query('SELECT * FROM orders WHERE id = ?', [req.params.id]);
    if (orderRows.length === 0) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    const [itemRows] = await pool.query('SELECT * FROM order_items WHERE order_id = ?', [req.params.id]);

    res.json({ ...orderRows[0], items: itemRows });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;