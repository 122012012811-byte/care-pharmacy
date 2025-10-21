-- ========================================
-- CARE PHARMACY DATABASE - COMPLETE SETUP
-- ========================================
-- Drop and recreate database
DROP DATABASE IF EXISTS care_pharmacy;
CREATE DATABASE care_pharmacy;
USE care_pharmacy;

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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create orders table
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create order_items table
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  medicine_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (medicine_id) REFERENCES medicines(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert 40 sample medicines
INSERT INTO medicines (name, category, description, price, dosage, manufacturer, image_url, stock) VALUES
('Dolo 650', 'Pain Relief', 'Effective pain reliever and fever reducer', 25.50, '650mg per tablet', 'Micro Labs', 'https://images.unsplash.com/photo-1584308666744-24d5c474a2a3?q=80&w=400', 20),
('Crocin Advance', 'Pain Relief', 'Fast relief from headache', 25.00, '500mg', 'GSK', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300', 15),
('Disprin', 'Pain Relief', 'Aspirin for pain relief', 20.00, '325mg', 'Reckitt', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300', 10),
('Combiflam', 'Pain Relief', 'For body pain and fever', 35.00, '400mg+325mg', 'Sanofi', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300', 5),
('Saridon', 'Pain Relief', 'Quick headache relief', 28.00, '250mg', 'Piramal', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300', 25),
('Brufen', 'Pain Relief', 'Ibuprofen for inflammation', 40.00, '400mg', 'Abbott', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300', 30),
('Volini Gel', 'Pain Relief', 'Topical pain relief gel', 150.00, '30g', 'Ranbaxy', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300', 15),
('Moov Cream', 'Pain Relief', 'For muscle and joint pain', 120.00, '50g', 'Reckitt', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300', 10),
('Voveran', 'Pain Relief', 'Diclofenac for severe pain', 45.00, '50mg', 'Novartis', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300', 20),
('Dart', 'Pain Relief', 'For acute pain management', 38.00, '100mg', 'Pfizer', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300', 5),
('Azithral 500', 'Prescriptions', 'Antibiotic for infections', 150.00, '500mg', 'Alembic', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300', 15),
('Augmentin 625', 'Prescriptions', 'Broad spectrum antibiotic', 180.00, '625mg', 'GSK', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300', 10),
('Amoxicillin', 'Prescriptions', 'For bacterial infections', 120.00, '500mg', 'Cipla', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300', 5),
('Ciprofloxacin', 'Prescriptions', 'Fluoroquinolone antibiotic', 95.00, '500mg', 'Sun Pharma', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300', 25),
('Pantoprazole', 'Prescriptions', 'For acid reflux and ulcers', 80.00, '40mg', 'Dr Reddys', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300', 10),
('Omez', 'Prescriptions', 'Omeprazole for gastritis', 75.00, '20mg', 'Dr Reddys', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300', 20),
('Ranitidine', 'Prescriptions', 'For heartburn and acidity', 60.00, '150mg', 'GSK', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300', 15),
('Metronidazole', 'Prescriptions', 'For parasitic infections', 90.00, '400mg', 'Abbott', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300', 10),
('Prednisolone', 'Prescriptions', 'Corticosteroid for inflammation', 110.00, '10mg', 'Wyeth', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300', 5),
('Cefixime', 'Prescriptions', 'Third generation antibiotic', 160.00, '200mg', 'Lupin', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300', 12),
('Telma 40', 'Cardiac Care', 'Telmisartan for hypertension', 145.00, '40mg', 'Glenmark', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300', 8),
('Amlodipine', 'Cardiac Care', 'Calcium channel blocker', 85.00, '5mg', 'Pfizer', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300', 16),
('Atenolol', 'Cardiac Care', 'Beta blocker for BP', 75.00, '50mg', 'Cipla', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300', 10),
('Ecosprin 75', 'Cardiac Care', 'Aspirin for heart health', 30.00, '75mg', 'USV', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300', 20),
('Atorvastatin', 'Cardiac Care', 'For cholesterol management', 120.00, '10mg', 'Pfizer', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300', 5),
('Rosuvastatin', 'Cardiac Care', 'Statin for high cholesterol', 180.00, '10mg', 'AstraZeneca', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300', 15),
('Metoprolol', 'Cardiac Care', 'Beta blocker for heart', 95.00, '25mg', 'Ajanta', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300', 10),
('Ramipril', 'Cardiac Care', 'ACE inhibitor for BP', 110.00, '5mg', 'Aventis', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300', 5),
('Clopidogrel', 'Cardiac Care', 'Antiplatelet medication', 140.00, '75mg', 'Sanofi', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300', 12),
('Digoxin', 'Cardiac Care', 'For heart rhythm control', 65.00, '0.25mg', 'GSK', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300', 8),
('Insulin Glargine 100U/ml', 'Diabetes Care', 'Long-acting insulin injection', 850.00, '100U/ml', 'Sanofi', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300', 5),
('Glipizide 5mg', 'Diabetes Care', 'Blood sugar control', 95.00, '5mg', 'Sun Pharma', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300', 15),
('Sitagliptin 100mg', 'Diabetes Care', 'Type 2 diabetes medication', 320.00, '100mg', 'Merck', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300', 10),
('Pioglitazone 30mg', 'Diabetes Care', 'Insulin sensitivity improvement', 180.00, '30mg', 'Lupin', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300', 5),
('Blood Sugar Test Kit', 'Diabetes Care', 'Glucose monitoring device', 1250.00, '50 strips', 'Accu-Chek', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300', 12),
('Lancets 100 Count', 'Diabetes Care', 'Blood sampling lancets', 180.00, '100 Count', 'OneTouch', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300', 8),
('Test Strips 50 Count', 'Diabetes Care', 'Glucose test strips', 550.00, '50 Count', 'Contour', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300', 20),
('Insulin Syringes', 'Diabetes Care', 'Insulin injection syringes', 220.00, '10pc', 'BD', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300', 5),
('Dapagliflozin 10mg', 'Diabetes Care', 'SGLT2 inhibitor', 385.00, '10mg', 'AstraZeneca', 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300', 15),
('Liraglutide 1.8mg', 'Diabetes Care', 'GLP-1 receptor agonist', 2850.00, '1.8mg', 'Novo Nordisk', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300', 10)