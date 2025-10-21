-- ========================================
-- CARE PHARMACY DATABASE - COMPLETE SETUP
-- ========================================
-- Drop and recreate database
DROP DATABASE IF EXISTS care_pharmacy;
CREATE DATABASE care_pharmacy;
USE care_pharmacy;

-- Create customers table
CREATE TABLE customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  pincode VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create medicines table
CREATE TABLE medicines (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT 100,
  dosage VARCHAR(100),
  manufacturer VARCHAR(255),
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create orders table
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'confirmed',
  payment_method VARCHAR(20) DEFAULT 'cod',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
  INDEX idx_customer (customer_id),
  INDEX idx_status (status),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create order_items table
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  medicine_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (medicine_id) REFERENCES medicines(id) ON DELETE CASCADE,
  INDEX idx_order (order_id),
  INDEX idx_medicine (medicine_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create transactions table
CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  customer_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(20) DEFAULT 'cod',
  status VARCHAR(20) DEFAULT 'completed',
  transaction_ref VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
  INDEX idx_order (order_id),
  INDEX idx_customer (customer_id),
  INDEX idx_status (status),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert 25 Indian medicines
INSERT INTO medicines (name, category, description, price, dosage, manufacturer, image_url, stock) VALUES
('Dolo 650mg', 'Pain Relief', 'Effective pain reliever and fever reducer', 30.00, '650mg per tablet', 'Micro Labs', 'https://images.unsplash.com/photo-1584308666744-24d5c474a2a3?w=500&h=500&fit=crop', 50),
('Azithral 500', 'Antibiotics', 'Antibiotic for bacterial infections', 150.00, '500mg per tablet', 'Alembic', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=500&fit=crop', 30),
('Augmentin 625', 'Antibiotics', 'Broad-spectrum antibiotic', 180.00, '625mg per tablet', 'GSK', 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=500&h=500&fit=crop', 25),
('Crocin Pain Relief', 'Pain Relief', 'Fast acting pain and fever relief', 25.00, '500mg per tablet', 'GSK', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&h=500&fit=crop', 60),
('Combiflam', 'Pain Relief', 'Dual action pain relief', 35.00, '400mg+325mg', 'Sanofi', 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500&h=500&fit=crop', 45),
('Metformin 500mg', 'Diabetes Care', 'Blood sugar control for type 2 diabetes', 45.00, '500mg per tablet', 'Sun Pharma', 'https://images.unsplash.com/photo-1550572017-4393b69d75e0?w=500&h=500&fit=crop', 40),
('Glycomet GP1', 'Diabetes Care', 'Diabetes management medication', 120.00, '500mg+1mg', 'USV Ltd', 'https://images.unsplash.com/photo-1584308666744-24d5c474a2a3?w=500&h=500&fit=crop', 35),
('Atorva 20mg', 'Cardiac Care', 'Cholesterol lowering medication', 85.00, '20mg per tablet', 'Zydus', 'https://images.unsplash.com/photo-1628771065518-8f8c4b0d4e5d?w=500&h=500&fit=crop', 30),
('Telma 40', 'Cardiac Care', 'Blood pressure control medication', 95.00, '40mg per tablet', 'Glenmark', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=500&fit=crop', 28),
('Ecosprin 75', 'Cardiac Care', 'Heart health and blood thinner', 18.00, '75mg per tablet', 'USV Ltd', 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=500&h=500&fit=crop', 55),
('Pan 40', 'Digestive Health', 'Reduces stomach acid production', 60.00, '40mg per tablet', 'Alkem', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&h=500&fit=crop', 42),
('Rantac 150', 'Digestive Health', 'Acidity and heartburn relief', 45.00, '150mg per tablet', 'JB Chemicals', 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500&h=500&fit=crop', 38),
('Sinarest', 'Cold & Flu', 'Relief from cold and flu symptoms', 28.00, '500mg combination', 'Centaur', 'https://images.unsplash.com/photo-1550572017-4393b69d75e0?w=500&h=500&fit=crop', 50),
('Vicks Action 500', 'Cold & Flu', 'Fast relief from cold symptoms', 32.00, '500mg per tablet', 'P&G Health', 'https://images.unsplash.com/photo-1584308666744-24d5c474a2a3?w=500&h=500&fit=crop', 48),
('Allegra 120', 'Allergy Relief', '24-hour allergy relief', 75.00, '120mg per tablet', 'Sanofi', 'https://images.unsplash.com/photo-1628771065518-8f8c4b0d4e5d?w=500&h=500&fit=crop', 32),
('Cetrizine 10mg', 'Allergy Relief', 'Antihistamine for allergies', 22.00, '10mg per tablet', 'Sun Pharma', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=500&fit=crop', 46),
('Vitamin D3 60K', 'Vitamins & Supplements', 'Essential vitamin for bone health', 65.00, '60000 IU', 'Mankind', 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=500&h=500&fit=crop', 40),
('Becadexamin', 'Vitamins & Supplements', 'Multivitamin supplement', 50.00, 'Multiple vitamins', 'Glaxo', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&h=500&fit=crop', 35),
('Shelcal 500', 'Vitamins & Supplements', 'Calcium supplement for bones', 120.00, '500mg calcium', 'Torrent', 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500&h=500&fit=crop', 38),
('Neurobion Forte', 'Vitamins & Supplements', 'Vitamin B complex supplement', 40.00, 'B1+B6+B12', 'P&G Health', 'https://images.unsplash.com/photo-1550572017-4393b69d75e0?w=500&h=500&fit=crop', 44),
('Disprin', 'Pain Relief', 'Fast dissolving pain relief', 20.00, '325mg per tablet', 'Reckitt', 'https://images.unsplash.com/photo-1584308666744-24d5c474a2a3?w=500&h=500&fit=crop', 52),
('Brufen 400', 'Pain Relief', 'Anti-inflammatory pain relief', 38.00, '400mg per tablet', 'Abbott', 'https://images.unsplash.com/photo-1628771065518-8f8c4b0d4e5d?w=500&h=500&fit=crop', 36),
('Amoxicillin 500', 'Antibiotics', 'Penicillin antibiotic', 45.00, '500mg per capsule', 'Cipla', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=500&fit=crop', 28),
('Ciprofloxacin 500', 'Antibiotics', 'Broad-spectrum antibiotic', 95.00, '500mg per tablet', 'Sun Pharma', 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=500&h=500&fit=crop', 24),
('Levocetrizine 5mg', 'Allergy Relief', 'Advanced allergy relief', 35.00, '5mg per tablet', 'Sun Pharma', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&h=500&fit=crop', 40);
