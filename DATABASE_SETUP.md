# 🗄️ Care Pharmacy - Database Setup Guide

## Overview
The Care Pharmacy website can store customer history, transactions, and payment data in a MySQL database.

## Prerequisites
- MySQL Server 8.0 or higher
- MySQL Workbench (optional, for GUI)

## Database Setup

### Step 1: Install MySQL Server
If you don't have MySQL installed:
1. Download from: https://dev.mysql.com/downloads/mysql/
2. Install and remember your root password

### Step 2: Create the Database

**Option A: Using MySQL Workbench**
1. Open MySQL Workbench
2. Connect to your local MySQL server
3. Open the file `database/setup-new.sql`
4. Click the lightning bolt icon to execute
5. Verify tables are created

**Option B: Using Command Line**
```bash
mysql -u root -p < database/setup-new.sql
```
Enter your MySQL password when prompted.

### Step 3: Configure Backend

1. Open `server/.env` file
2. Update with your MySQL password:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_DATABASE=care_pharmacy
PORT=5001
```

### Step 4: Restart Backend Server

Stop the current server (Ctrl+C) and restart:
```powershell
cd server
node server.js
```

You should see: ✅ Database connected successfully

## Database Schema

### Tables Created

1. **customers** - Customer information
   - id, name, email, phone, address, city, pincode
   - Indexed on email for fast lookup

2. **medicines** - Product catalog
   - id, name, category, description, price, stock, dosage, manufacturer, image_url
   - Pre-populated with 25 Indian medicines
   - Indexed on category and name

3. **orders** - Order records
   - id, customer_id, total_amount, status, payment_method, created_at
   - Links to customers table
   - Indexed on customer_id, status, and created_at

4. **order_items** - Individual items in each order
   - id, order_id, medicine_id, quantity, price
   - Links to orders and medicines tables

5. **transactions** - Payment transaction records
   - id, order_id, customer_id, amount, payment_method, status, transaction_ref, created_at
   - Complete audit trail of all payments
   - Indexed for fast reporting

## Features with Database

### Customer History Tracking
Every customer's orders are stored with their profile:
```
GET /api/customers/:email/history
```

Returns:
- Customer profile
- Complete order history
- Items purchased in each order

### Transaction Recording
All payments are logged in the transactions table:
```
GET /api/transactions
```

Returns:
- Transaction ID
- Order reference
- Customer details
- Amount and payment method
- Transaction status
- Timestamp

### Stock Management
- Medicine stock automatically decrements when orders are placed
- Stock levels update in real-time
- Prevents overselling (checks stock before order confirmation)

### Order Management
Full order lifecycle tracking:
- Order creation with customer linking
- Item-level details
- Payment method recording
- Status tracking (confirmed, processing, shipped, delivered)

## API Endpoints (Database-Enabled)

### Medicines
- `GET /api/medicines` - Get all medicines from database
- `GET /api/medicines/:id` - Get single medicine details

### Orders
- `POST /api/orders` - Create order with customer and transaction records
- `GET /api/orders` - Get all orders with customer info
- `GET /api/orders/:id` - Get order details with all items

### Customer History
- `GET /api/customers/:email/history` - Complete customer order history

### Transactions
- `GET /api/transactions` - All payment transactions with customer info

## Sample Data

The database comes pre-populated with:
- **25 Indian medicines** across 8 categories:
  - Pain Relief (Dolo 650, Combiflam, Brufen, etc.)
  - Antibiotics (Azithral, Augmentin, Ciprofloxacin, etc.)
  - Cardiac Care (Telma, Atorva, Ecosprin, etc.)
  - Diabetes Care (Metformin, Glycomet, etc.)
  - Digestive Health (Pan 40, Rantac, etc.)
  - Cold & Flu (Sinarest, Vicks Action, etc.)
  - Allergy Relief (Allegra, Cetrizine, etc.)
  - Vitamins & Supplements (Vitamin D3, Shelcal, Neurobion, etc.)

## Testing the Database

### Test 1: Check Connection
```powershell
# Backend should show: ✅ Database connected successfully
```

### Test 2: Browse Medicines
```powershell
Invoke-RestMethod http://localhost:5001/api/medicines
```
Should return 25 medicines from database.

### Test 3: Place an Order
1. Add items to cart on website
2. Complete checkout
3. Check MySQL Workbench:
   ```sql
   SELECT * FROM customers;
   SELECT * FROM orders;
   SELECT * FROM order_items;
   SELECT * FROM transactions;
   ```

### Test 4: View Customer History
```powershell
# Replace with actual email used in order
Invoke-RestMethod http://localhost:5001/api/customers/test@example.com/history
```

### Test 5: View Transactions
```powershell
Invoke-RestMethod http://localhost:5001/api/transactions
```

## Fallback Mechanism

The backend has intelligent fallback:
- If database connection fails → uses mock data
- Website continues to work seamlessly
- Error logged to console
- No user-facing errors

## Troubleshooting

### Error: Database connection failed
**Solution:**
1. Check MySQL server is running
2. Verify credentials in `server/.env`
3. Test connection:
   ```bash
   mysql -u root -p
   USE care_pharmacy;
   SHOW TABLES;
   ```

### Error: Access denied for user 'root'
**Solution:**
- Update password in `.env` file
- Or reset MySQL root password

### Error: Unknown database 'care_pharmacy'
**Solution:**
- Run `database/setup-new.sql` script again
- Or manually create database:
  ```sql
  CREATE DATABASE care_pharmacy;
  ```

### Orders not appearing in database
**Solution:**
1. Check backend console for errors
2. Verify database connection message
3. Test with Postman/Thunder Client:
   ```
   POST http://localhost:5001/api/orders
   Body: {
     "customer_name": "Test User",
     "customer_email": "test@example.com",
     "customer_phone": "9876543210",
     "total_amount": 100,
     "items": [{
       "medicine_id": 1,
       "quantity": 2,
       "price": 30
     }],
     "payment_method": "cod"
   }
   ```

## Database Queries

### View all orders with customer names
```sql
SELECT o.id, c.name, c.email, o.total_amount, o.payment_method, o.created_at
FROM orders o
JOIN customers c ON o.customer_id = c.id
ORDER BY o.created_at DESC;
```

### View order items details
```sql
SELECT o.id as order_id, c.name as customer, m.name as medicine, 
       oi.quantity, oi.price, (oi.quantity * oi.price) as total
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN order_items oi ON o.id = oi.order_id
JOIN medicines m ON oi.medicine_id = m.id
ORDER BY o.created_at DESC;
```

### View all transactions
```sql
SELECT t.id, c.name, t.amount, t.payment_method, t.status, t.created_at
FROM transactions t
JOIN customers c ON t.customer_id = c.id
ORDER BY t.created_at DESC;
```

### Customer purchase summary
```sql
SELECT c.name, c.email, COUNT(o.id) as total_orders, 
       SUM(o.total_amount) as total_spent
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id
ORDER BY total_spent DESC;
```

## Backup and Restore

### Backup Database
```bash
mysqldump -u root -p care_pharmacy > backup.sql
```

### Restore Database
```bash
mysql -u root -p care_pharmacy < backup.sql
```

---

**Note:** Database integration is optional. The website works perfectly with in-memory mock data if you prefer not to set up MySQL.
