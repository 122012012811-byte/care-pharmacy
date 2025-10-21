const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'care_pharmacy',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
pool.getConnection()
  .then(connection => {
    console.log('✅ Database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.log('⚠️ Database connection failed, using mock data');
    console.error(err.message);
  });

// Middleware
app.use(cors());
app.use(express.json());

// Mock medicine data for reliable demo
const mockMedicines = [
  { id: 1, name: "Dolo 650mg", category: "Pain Relief", description: "Effective pain reliever and fever reducer", price: 30.00, dosage: "650mg per tablet", manufacturer: "Micro Labs", image_url: "https://images.unsplash.com/photo-1584308666744-24d5c474a2a3?w=500&h=500&fit=crop", stock: 50 },
  { id: 2, name: "Azithral 500", category: "Antibiotics", description: "Antibiotic for bacterial infections", price: 150.00, dosage: "500mg per tablet", manufacturer: "Alembic", image_url: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=500&fit=crop", stock: 30 },
  { id: 3, name: "Augmentin 625", category: "Antibiotics", description: "Broad-spectrum antibiotic", price: 180.00, dosage: "625mg per tablet", manufacturer: "GSK", image_url: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=500&h=500&fit=crop", stock: 25 },
  { id: 4, name: "Crocin Pain Relief", category: "Pain Relief", description: "Fast acting pain and fever relief", price: 25.00, dosage: "500mg per tablet", manufacturer: "GSK", image_url: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&h=500&fit=crop", stock: 60 },
  { id: 5, name: "Combiflam", category: "Pain Relief", description: "Dual action pain relief", price: 35.00, dosage: "400mg+325mg", manufacturer: "Sanofi", image_url: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500&h=500&fit=crop", stock: 45 },
  { id: 6, name: "Metformin 500mg", category: "Diabetes Care", description: "Blood sugar control for type 2 diabetes", price: 45.00, dosage: "500mg per tablet", manufacturer: "Sun Pharma", image_url: "https://images.unsplash.com/photo-1550572017-4393b69d75e0?w=500&h=500&fit=crop", stock: 40 },
  { id: 7, name: "Glycomet GP1", category: "Diabetes Care", description: "Diabetes management medication", price: 120.00, dosage: "500mg+1mg", manufacturer: "USV Ltd", image_url: "https://images.unsplash.com/photo-1584308666744-24d5c474a2a3?w=500&h=500&fit=crop", stock: 35 },
  { id: 8, name: "Atorva 20mg", category: "Cardiac Care", description: "Cholesterol lowering medication", price: 85.00, dosage: "20mg per tablet", manufacturer: "Zydus", image_url: "https://images.unsplash.com/photo-1628771065518-8f8c4b0d4e5d?w=500&h=500&fit=crop", stock: 30 },
  { id: 9, name: "Telma 40", category: "Cardiac Care", description: "Blood pressure control medication", price: 95.00, dosage: "40mg per tablet", manufacturer: "Glenmark", image_url: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=500&fit=crop", stock: 28 },
  { id: 10, name: "Ecosprin 75", category: "Cardiac Care", description: "Heart health and blood thinner", price: 18.00, dosage: "75mg per tablet", manufacturer: "USV Ltd", image_url: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=500&h=500&fit=crop", stock: 55 },
  { id: 11, name: "Pan 40", category: "Digestive Health", description: "Reduces stomach acid production", price: 60.00, dosage: "40mg per tablet", manufacturer: "Alkem", image_url: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&h=500&fit=crop", stock: 42 },
  { id: 12, name: "Rantac 150", category: "Digestive Health", description: "Acidity and heartburn relief", price: 45.00, dosage: "150mg per tablet", manufacturer: "JB Chemicals", image_url: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500&h=500&fit=crop", stock: 38 },
  { id: 13, name: "Sinarest", category: "Cold & Flu", description: "Relief from cold and flu symptoms", price: 28.00, dosage: "500mg combination", manufacturer: "Centaur", image_url: "https://images.unsplash.com/photo-1550572017-4393b69d75e0?w=500&h=500&fit=crop", stock: 50 },
  { id: 14, name: "Vicks Action 500", category: "Cold & Flu", description: "Fast relief from cold symptoms", price: 32.00, dosage: "500mg per tablet", manufacturer: "P&G Health", image_url: "https://images.unsplash.com/photo-1584308666744-24d5c474a2a3?w=500&h=500&fit=crop", stock: 48 },
  { id: 15, name: "Allegra 120", category: "Allergy Relief", description: "24-hour allergy relief", price: 75.00, dosage: "120mg per tablet", manufacturer: "Sanofi", image_url: "https://images.unsplash.com/photo-1628771065518-8f8c4b0d4e5d?w=500&h=500&fit=crop", stock: 32 },
  { id: 16, name: "Cetrizine 10mg", category: "Allergy Relief", description: "Antihistamine for allergies", price: 22.00, dosage: "10mg per tablet", manufacturer: "Sun Pharma", image_url: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=500&fit=crop", stock: 46 },
  { id: 17, name: "Vitamin D3 60K", category: "Vitamins & Supplements", description: "Essential vitamin for bone health", price: 65.00, dosage: "60000 IU", manufacturer: "Mankind", image_url: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=500&h=500&fit=crop", stock: 40 },
  { id: 18, name: "Becadexamin", category: "Vitamins & Supplements", description: "Multivitamin supplement", price: 50.00, dosage: "Multiple vitamins", manufacturer: "Glaxo", image_url: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&h=500&fit=crop", stock: 35 },
  { id: 19, name: "Shelcal 500", category: "Vitamins & Supplements", description: "Calcium supplement for bones", price: 120.00, dosage: "500mg calcium", manufacturer: "Torrent", image_url: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500&h=500&fit=crop", stock: 38 },
  { id: 20, name: "Neurobion Forte", category: "Vitamins & Supplements", description: "Vitamin B complex supplement", price: 40.00, dosage: "B1+B6+B12", manufacturer: "P&G Health", image_url: "https://images.unsplash.com/photo-1550572017-4393b69d75e0?w=500&h=500&fit=crop", stock: 44 },
  { id: 21, name: "Disprin", category: "Pain Relief", description: "Fast dissolving pain relief", price: 20.00, dosage: "325mg per tablet", manufacturer: "Reckitt", image_url: "https://images.unsplash.com/photo-1584308666744-24d5c474a2a3?w=500&h=500&fit=crop", stock: 52 },
  { id: 22, name: "Brufen 400", category: "Pain Relief", description: "Anti-inflammatory pain relief", price: 38.00, dosage: "400mg per tablet", manufacturer: "Abbott", image_url: "https://images.unsplash.com/photo-1628771065518-8f8c4b0d4e5d?w=500&h=500&fit=crop", stock: 36 },
  { id: 23, name: "Amoxicillin 500", category: "Antibiotics", description: "Penicillin antibiotic", price: 45.00, dosage: "500mg per capsule", manufacturer: "Cipla", image_url: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=500&fit=crop", stock: 28 },
  { id: 24, name: "Ciprofloxacin 500", category: "Antibiotics", description: "Broad-spectrum antibiotic", price: 95.00, dosage: "500mg per tablet", manufacturer: "Sun Pharma", image_url: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=500&h=500&fit=crop", stock: 24 },
  { id: 25, name: "Levocetrizine 5mg", category: "Allergy Relief", description: "Advanced allergy relief", price: 35.00, dosage: "5mg per tablet", manufacturer: "Sun Pharma", image_url: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&h=500&fit=crop", stock: 40 },
];

let orders = [];
let orderIdCounter = 100001;

// Routes
// Get all medicines
app.get('/api/medicines', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM medicines ORDER BY category, name');
    res.json(rows);
  } catch (err) {
    console.warn('Database error, using mock data:', err.message);
    res.json(mockMedicines);
  }
});

// Get single medicine
app.get('/api/medicines/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM medicines WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ msg: 'Medicine not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    const medicine = mockMedicines.find(m => m.id === parseInt(req.params.id));
    if (!medicine) {
      return res.status(404).json({ msg: 'Medicine not found' });
    }
    res.json(medicine);
  }
});

// Place order
app.post('/api/orders', async (req, res) => {
  const { customer_name, customer_email, customer_phone, total_amount, items, address, city, pincode, payment_method } = req.body;

  if (!customer_name || !customer_email || !total_amount || !items || items.length === 0) {
    return res.status(400).json({ msg: 'Please enter all required fields and include order items' });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // Insert customer or get existing
    const [customerCheck] = await connection.query(
      'SELECT id FROM customers WHERE email = ?',
      [customer_email]
    );

    let customerId;
    if (customerCheck.length > 0) {
      customerId = customerCheck[0].id;
      // Update customer info
      await connection.query(
        'UPDATE customers SET name = ?, phone = ?, address = ?, city = ?, pincode = ? WHERE id = ?',
        [customer_name, customer_phone, address || '', city || '', pincode || '', customerId]
      );
    } else {
      // Insert new customer
      const [customerResult] = await connection.query(
        'INSERT INTO customers (name, email, phone, address, city, pincode) VALUES (?, ?, ?, ?, ?, ?)',
        [customer_name, customer_email, customer_phone, address || '', city || '', pincode || '']
      );
      customerId = customerResult.insertId;
    }

    // Insert order
    const [orderResult] = await connection.query(
      'INSERT INTO orders (customer_id, total_amount, status, payment_method) VALUES (?, ?, ?, ?)',
      [customerId, total_amount, 'confirmed', payment_method || 'cod']
    );
    const orderId = orderResult.insertId;

    // Insert order items and update stock
    for (const item of items) {
      const { medicine_id, name, price, quantity } = item;
      
      // Check stock
      const [medicineRows] = await connection.query('SELECT stock FROM medicines WHERE id = ?', [medicine_id]);
      if (medicineRows.length === 0 || medicineRows[0].stock < quantity) {
        throw new Error(`Insufficient stock for medicine ID ${medicine_id}`);
      }

      // Insert order item
      await connection.query(
        'INSERT INTO order_items (order_id, medicine_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, medicine_id, quantity, price]
      );

      // Update stock
      await connection.query(
        'UPDATE medicines SET stock = stock - ? WHERE id = ?',
        [quantity, medicine_id]
      );
    }

    // Insert transaction record
    await connection.query(
      'INSERT INTO transactions (order_id, customer_id, amount, payment_method, status) VALUES (?, ?, ?, ?, ?)',
      [orderId, customerId, total_amount, payment_method || 'cod', 'completed']
    );

    await connection.commit();
    
    res.status(201).json({ 
      msg: 'Order placed successfully', 
      orderId: orderId,
      customerId: customerId
    });

  } catch (err) {
    if (connection) await connection.rollback();
    console.error('Order error:', err);
    
    // Fallback to mock order
    const order = {
      id: orderIdCounter++,
      customer_name,
      customer_email,
      customer_phone,
      total_amount,
      items,
      status: 'confirmed',
      created_at: new Date().toISOString()
    };
    orders.push(order);

    // Update mock stock
    items.forEach(item => {
      const medicine = mockMedicines.find(m => m.id === item.medicine_id);
      if (medicine) {
        medicine.stock = Math.max(0, medicine.stock - item.quantity);
      }
    });

    res.status(201).json({ 
      msg: 'Order placed successfully (mock)', 
      orderId: order.id,
      order: order
    });
  } finally {
    if (connection) connection.release();
  }
});

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT o.*, c.name as customer_name, c.email as customer_email, c.phone as customer_phone
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      ORDER BY o.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    res.json(orders);
  }
});

// Get single order with items
app.get('/api/orders/:id', async (req, res) => {
  try {
    const [orderRows] = await pool.query(`
      SELECT o.*, c.name as customer_name, c.email as customer_email, c.phone as customer_phone,
             c.address, c.city, c.pincode
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      WHERE o.id = ?
    `, [req.params.id]);
    
    if (orderRows.length === 0) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    const [itemRows] = await pool.query(`
      SELECT oi.*, m.name as medicine_name, m.dosage, m.manufacturer
      FROM order_items oi
      JOIN medicines m ON oi.medicine_id = m.id
      WHERE oi.order_id = ?
    `, [req.params.id]);

    res.json({ ...orderRows[0], items: itemRows });
  } catch (err) {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }
    res.json(order);
  }
});

// Get customer history
app.get('/api/customers/:email/history', async (req, res) => {
  try {
    const [customer] = await pool.query('SELECT * FROM customers WHERE email = ?', [req.params.email]);
    
    if (customer.length === 0) {
      return res.status(404).json({ msg: 'Customer not found' });
    }

    const [orderHistory] = await pool.query(`
      SELECT o.*, 
        (SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
            'medicine_name', m.name,
            'quantity', oi.quantity,
            'price', oi.price
          )
        )
        FROM order_items oi
        JOIN medicines m ON oi.medicine_id = m.id
        WHERE oi.order_id = o.id
        ) as items
      FROM orders o
      WHERE o.customer_id = ?
      ORDER BY o.created_at DESC
    `, [customer[0].id]);

    res.json({
      customer: customer[0],
      orders: orderHistory
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Get all transactions
app.get('/api/transactions', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT t.*, c.name as customer_name, c.email as customer_email,
             o.total_amount
      FROM transactions t
      JOIN customers c ON t.customer_id = c.id
      JOIN orders o ON t.order_id = o.id
      ORDER BY t.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    res.json([]);
  }
});

// Cancel order
app.put('/api/orders/:id/cancel', async (req, res) => {
  const orderId = req.params.id;
  
  try {
    // Check if order exists and can be cancelled
    const [orderRows] = await pool.query('SELECT * FROM orders WHERE id = ?', [orderId]);
    
    if (orderRows.length === 0) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    const order = orderRows[0];
    const currentStatus = order.status?.toLowerCase();
    
    // Can only cancel if confirmed or processing
    if (currentStatus === 'cancelled') {
      return res.status(400).json({ msg: 'Order is already cancelled' });
    }
    
    if (currentStatus === 'delivered') {
      return res.status(400).json({ msg: 'Cannot cancel delivered orders' });
    }

    if (currentStatus === 'shipped') {
      return res.status(400).json({ msg: 'Cannot cancel shipped orders. Please contact support.' });
    }

    // Get order items to restore stock
    const [items] = await pool.query('SELECT medicine_id, quantity FROM order_items WHERE order_id = ?', [orderId]);
    
    // Begin transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Update order status to cancelled
      await connection.query('UPDATE orders SET status = ? WHERE id = ?', ['cancelled', orderId]);
      
      // Restore stock for each item
      for (const item of items) {
        await connection.query('UPDATE medicines SET stock = stock + ? WHERE id = ?', [item.quantity, item.medicine_id]);
      }

      // Update transaction status
      await connection.query('UPDATE transactions SET status = ? WHERE order_id = ?', ['refunded', orderId]);

      await connection.commit();
      connection.release();
      
      res.json({ 
        msg: 'Order cancelled successfully',
        orderId: orderId
      });
    } catch (err) {
      await connection.rollback();
      connection.release();
      throw err;
    }
  } catch (err) {
    console.error('Cancel order error:', err);
    
    // Fallback for mock data
    const orderIndex = orders.findIndex(o => o.id === parseInt(orderId));
    if (orderIndex !== -1) {
      orders[orderIndex].status = 'cancelled';
      
      // Restore stock in mock data
      orders[orderIndex].items.forEach(item => {
        const medicine = mockMedicines.find(m => m.id === item.medicine_id);
        if (medicine) {
          medicine.stock += item.quantity;
        }
      });
      
      return res.json({ 
        msg: 'Order cancelled successfully (mock)', 
        orderId: orderId 
      });
    }
    
    res.status(500).json({ msg: 'Failed to cancel order', error: err.message });
  }
});

// Update order status (for admin/future use)
app.put('/api/orders/:id/status', async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;
  
  const validStatuses = ['confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
  
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ msg: 'Invalid status value' });
  }

  try {
    const [result] = await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    res.json({ 
      msg: 'Order status updated successfully',
      orderId: orderId,
      newStatus: status
    });
  } catch (err) {
    console.error('Update status error:', err);
    
    // Fallback for mock data
    const order = orders.find(o => o.id === parseInt(orderId));
    if (order) {
      order.status = status;
      return res.json({ 
        msg: 'Order status updated (mock)', 
        orderId: orderId,
        newStatus: status
      });
    }
    
    res.status(500).json({ msg: 'Failed to update order status', error: err.message });
  }
});

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'running',
    message: 'Care Pharmacy API is running!',
    endpoints: {
      medicines: '/api/medicines',
      orders: '/api/orders'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!', message: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`\n🚀 Care Pharmacy Server Running!`);
  console.log(`📍 Port: ${PORT}`);
  console.log(`🏥 Health: http://localhost:${PORT}/`);
  console.log(`💊 Medicines: http://localhost:${PORT}/api/medicines`);
  console.log(`📦 Orders: http://localhost:${PORT}/api/orders\n`);
});