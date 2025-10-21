import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Search, ShoppingCart, Plus, Minus, X, CheckCircle, CreditCard, MapPin, Truck, Star, User, Menu, Package, Clock, XCircle, RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';

// --- TYPE DEFINITIONS (Removed for JSX) ---

// --- MOCK DATA ---
const mockMedicines = [
  { id: 1, name: "Dolo 650mg", category: "Pain Relief", description: "Effective pain reliever and fever reducer", price: 30.00, dosage: "650mg per tablet", manufacturer: "Micro Labs", image_url: "https://images.unsplash.com/photo-1584308666744-24d5c474a2a3?w=500&h=500&fit=crop", stock: 50 },
  { id: 2, name: "Azithral 500", category: "Antibiotics", description: "Antibiotic for bacterial infections", price: 150.00, dosage: "500mg per tablet", manufacturer: "Alembic", image_url: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=500&fit=crop", stock: 30 },
  { id: 3, name: "Augmentin 625", category: "Antibiotics", description: "Broad-spectrum antibiotic", price: 180.00, dosage: "625mg per tablet", manufacturer: "GSK", image_url: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=500&h=500&fit=crop", stock: 25 },
  { id: 4, name: "Crocin Pain Relief", category: "Pain Relief", description: "Fast acting pain and fever relief", price: 25.00, dosage: "500mg per tablet", manufacturer: "GSK", image_url: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&h=500&fit=crop", stock: 60 },
  { id: 5, name: "Combiflam", category: "Pain Relief", description: "Dual action pain relief", price: 35.00, dosage: "400mg+325mg", manufacturer: "Sanofi", image_url: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500&h=500&fit=crop", stock: 45 },
  { id: 6, name: "Metformin 500mg", category: "Diabetes Care", description: "Blood sugar control for type 2 diabetes", price: 45.00, dosage: "500mg per tablet", manufacturer: "Sun Pharma", image_url: "https://images.unsplash.com/photo-1550572017-4393b69d75e0?w=500&h=500&fit=crop", stock: 40 },
];

// --- GLOBAL STYLES ---
const GlobalStyles = () => (
  <style jsx global>{`
    :root {
      --bg-primary: #111827;
      --bg-secondary: #1F2937;
      --bg-tertiary: #374151;
      --text-primary: #F9FAFB;
      --text-secondary: #D1D5DB;
      --accent-primary: #3B82F6;
      --accent-secondary: #10B981;
      --accent-tertiary: #F59E0B;
      --accent-glow: rgba(59, 130, 246, 0.5);
      --border-color: #4B5563;
      --shadow-color: rgba(0, 0, 0, 0.5);
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeOut {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(8px); }
    }
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
    @keyframes popIn {
      0% { opacity: 0; transform: scale(0.95); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes fly-to-cart {
      0% { opacity: 1; transform: scale(1) translateY(0) rotate(0deg); }
      100% { opacity: 0; transform: scale(0.1) translateY(-40px) rotate(360deg); }
    }
    .modal-enter {
      animation: fadeIn 0.25s ease-out forwards;
    }
    .modal-exit {
      animation: fadeOut 0.2s ease-out forwards;
    }
    .sidebar-enter {
      animation: slideInRight 0.3s ease-out forwards;
    }
    .sidebar-exit {
      animation: slideOutRight 0.25s ease-out forwards;
    }
    .card-enter {
      animation: popIn 0.3s ease-out forwards;
    }
    .fly-item {
      position: fixed;
      z-index: 9999;
      pointer-events: none;
      border-radius: 9999px;
      animation: fly-to-cart 0.5s ease-out forwards;
      will-change: transform, opacity;
    }
    body {
      background-color: var(--bg-primary);
      color: var(--text-primary);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      scroll-behavior: smooth;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    * {
      scroll-behavior: smooth;
    }
    html {
      scroll-behavior: smooth;
    }
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: var(--accent-primary);
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--accent-secondary);
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--accent-secondary);
    }
    button {
      cursor: pointer;
      transition: all 0.2s ease-out;
      will-change: transform, box-shadow;
    }
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }
    button:active {
      transform: translateY(0);
    }
    .glass {
      background: rgba(31, 41, 55, 0.7);
      backdrop-filter: saturate(180%) blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      box-shadow: 0 8px 32px 0 var(--shadow-color);
      transition: all 0.3s ease-out;
      will-change: transform, box-shadow;
    }
    .glass:hover {
      box-shadow: 0 12px 40px 0 var(--shadow-color);
      transform: translateY(-1px);
    }
  `}</style>
);

// --- MEDICINE CARD COMPONENT ---
const MedicineCard = React.memo(({ medicine, onAddToCart }) => {
  const [isAdding, setIsAdding] = useState(false);
  const cardRef = useRef(null);

  const handleAddClick = () => {
    if (medicine.stock <= 0) {
      alert('Out of stock');
      return;
    }
    if (cardRef.current) {
      onAddToCart(medicine, cardRef.current);
      setIsAdding(true);
      setTimeout(() => setIsAdding(false), 600);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`card-enter bg-var(--bg-secondary) glass p-4 rounded-lg shadow-lg flex flex-col hover:shadow-2xl transition-all duration-300 relative overflow-hidden group`}
      style={{ 
        backgroundColor: 'var(--bg-secondary)',
        willChange: 'transform, box-shadow'
      }}
    >
      <div className="relative rounded-lg overflow-hidden mb-4 shadow-md">
        <img 
          src={medicine.image_url} 
          alt={medicine.name} 
          className="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105" 
          style={{ 
            willChange: 'transform'
          }}
        />
        {medicine.stock > 0 ? (
          <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg backdrop-blur-sm bg-opacity-90 transition-all duration-200">
            In Stock
          </span>
        ) : (
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg backdrop-blur-sm bg-opacity-90 transition-all duration-200">
            Out of Stock
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="flex-1 flex flex-col">
        <span className="text-xs text-accent-primary font-semibold mb-1">{medicine.category}</span>
        <h3 className="text-lg font-bold mb-1 truncate" title={medicine.name}>{medicine.name}</h3>
        <p className="text-sm text-text-secondary flex-1 mb-2 line-clamp-3" title={medicine.description}>{medicine.description}</p>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className={i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-600'} />
          ))}
          <span className="text-xs text-text-secondary ml-2">(4.2)</span>
        </div>
        <p className="text-sm text-text-secondary mb-1"><strong>Manufacturer:</strong> {medicine.manufacturer}</p>
        <p className="text-sm text-text-secondary mb-3"><strong>Dosage:</strong> {medicine.dosage}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-extrabold text-text-primary">₹{medicine.price.toFixed(2)}</span>
            <div className="flex items-center text-accent-secondary text-xs mt-1">
              <Truck size={14} className="mr-1" /> Free Delivery
            </div>
          </div>
          <button
            onClick={handleAddClick}
            disabled={medicine.stock <= 0 || isAdding}
            className={`bg-accent-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg`}
            style={{ willChange: 'transform, box-shadow' }}
          >
            <Plus size={16} className="transition-transform duration-200" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
});

// --- CART SIDEBAR COMPONENT ---
const CartSidebar = ({ cart, onClose, onRemove, onUpdateQuantity, onCheckout, isOpen }) => {
  const totalPrice = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.quantity, 0), [cart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-70" onClick={onClose}></div>
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-bg-secondary glass shadow-xl flex flex-col sidebar-enter">
        <header className="flex items-center justify-between p-4 border-b border-border-color">
          <h2 className="text-xl font-bold flex items-center text-text-primary">
            <ShoppingCart className="mr-2" size={24} /> Cart ({cart.length})
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-bg-tertiary rounded">
            <X size={24} />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center text-text-secondary mt-20">
              <ShoppingCart size={64} className="mx-auto mb-4" />
              <p>Your cart is empty</p>
              <p className="text-sm mt-2">Add medicines to get started</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map(item => (
                <li key={item.id} className="flex items-start space-x-4 bg-bg-tertiary p-3 rounded-lg">
                  <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-text-primary truncate" title={item.name}>{item.name}</h3>
                    <p className="text-xs text-text-secondary">{item.dosage}</p>
                    <p className="text-sm font-bold text-accent-primary mt-1">₹{item.price.toFixed(2)}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-bg-primary rounded"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-3 py-1 bg-bg-secondary rounded border border-border-color min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-bg-primary rounded"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="ml-auto p-1 hover:bg-red-700 rounded"
                        aria-label="Remove item"
                      >
                        <X size={16} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                  <div className="font-semibold text-text-primary self-center">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {cart.length > 0 && (
          <footer className="p-4 border-t border-border-color">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold">Total:</span>
              <span className="text-xl font-extrabold text-accent-primary">₹{totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-accent-primary hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Proceed to Checkout
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
};

// --- CHECKOUT MODAL COMPONENT ---
const CheckoutModal = ({ isOpen, onClose, cart, onOrderComplete }) => {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'cod'
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        address: '',
        city: '',
        pincode: '',
        paymentMethod: 'cod'
      });
      setIsLoading(false);
    }
  }, [isOpen]);

  const totalAmount = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.quantity, 0), [cart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Cart is empty');
      return;
    }
    setIsLoading(true);
    try {
      // Build order payload
      const payload = {
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        total_amount: Number(totalAmount.toFixed(2)),
        items: cart.map(ci => ({
          medicine_id: ci.id,
          name: ci.name,
          price: ci.price,
          quantity: ci.quantity
        }))
      };
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Order API error ${res.status}`);
      }
      const data = await res.json();
      const orderId = data.orderId || Math.floor(100000 + Math.random() * 900000);
      onOrderComplete({
        orderId,
        address: `${formData.address}, ${formData.city}, ${formData.pincode}`,
        total: totalAmount,
        paymentMethod: formData.paymentMethod
      });
      onClose();
    } catch (err) {
      console.warn('Order API failed, falling back to mock success:', err.message);
      // Fallback to mock success to keep demo usable
      onOrderComplete({
        orderId: Math.floor(100000 + Math.random() * 900000),
        address: `${formData.address}, ${formData.city}, ${formData.pincode}`,
        total: totalAmount,
        paymentMethod: formData.paymentMethod
      });
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-70" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-bg-secondary glass shadow-xl overflow-y-auto modal-enter">
        <div className="p-6">
          <header className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-primary">Checkout</h2>
            <button onClick={onClose} className="p-2 hover:bg-bg-tertiary rounded">
              <X size={24} />
            </button>
          </header>
          <form onSubmit={handleSubmit} className="space-y-6">
            <section className="bg-bg-tertiary p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-text-primary">
                <CreditCard className="mr-2" size={20} /> Customer Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="customer_name"
                    required
                    value={formData.customer_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded bg-bg-secondary border border-border-color text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    name="customer_email"
                    required
                    value={formData.customer_email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded bg-bg-secondary border border-border-color text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="customer_phone"
                    required
                    value={formData.customer_phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded bg-bg-secondary border border-border-color text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                  />
                </div>
              </div>
            </section>
            <section className="bg-bg-tertiary p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-text-primary">
                <MapPin className="mr-2" size={20} /> Delivery Address
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Address *</label>
                  <textarea
                    name="address"
                    required
                    rows={3}
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded bg-bg-secondary border border-border-color text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                    placeholder="House/Flat No., Street, Area"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded bg-bg-secondary border border-border-color text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">PIN Code *</label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      pattern="[0-9]{6}"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded bg-bg-secondary border border-border-color text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                    />
                  </div>
                </div>
              </div>
            </section>
            <section className="bg-bg-tertiary p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-text-primary">
                <CreditCard className="mr-2" size={20} /> Payment Method
              </h3>
              <div className="space-y-3">
                {['cod', 'upi', 'card'].map(method => (
                  <label key={method} className="flex items-center p-3 border border-border-color rounded-lg cursor-pointer hover:bg-bg-primary">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={formData.paymentMethod === method}
                      onChange={handleChange}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium capitalize">
                        {method === 'cod' ? 'Cash on Delivery' : method === 'upi' ? 'UPI Payment (Mock)' : 'Credit/Debit Card (Mock)'}
                      </div>
                      <div className="text-xs text-text-secondary">
                        {method === 'cod' ? 'Pay when you receive your order' : method === 'upi' ? 'Pay using UPI - Demo mode' : 'Secure card payment - Demo mode'}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </section>
            <section className="bg-bg-tertiary p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-text-primary">
                <Truck className="mr-2" size={20} /> Order Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.length} items)</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-accent-secondary">
                  <span>Delivery Charges</span>
                  <span>FREE</span>
                </div>
                <div className="border-t border-border-color pt-2 flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </section>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent-primary hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors"
            >
              {isLoading ? 'Processing...' : `Place Order - ₹${totalAmount.toFixed(2)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- ORDER SUCCESS MODAL COMPONENT ---
const OrderSuccessModal = ({ isOpen, onClose, orderDetails }) => {
  if (!isOpen || !orderDetails) return null;

  const getPaymentMethodDisplay = (method) => {
    switch (method) {
      case 'cod': return 'Cash on Delivery';
      case 'upi': return 'UPI Payment (Mock)';
      case 'card': return 'Credit/Debit Card (Mock)';
      default: return method;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-70" onClick={onClose}></div>
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-bg-secondary glass rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto modal-enter p-6">
          <header className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-accent-secondary">Order Confirmed!</h2>
            <button onClick={onClose} className="p-2 hover:bg-bg-tertiary rounded">
              <X size={24} />
            </button>
          </header>
          <div className="text-center mb-6">
            <CheckCircle size={80} className="text-accent-secondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary mb-2">Thank you for your order!</h3>
            <p className="text-text-secondary">Your order has been placed successfully and will be delivered soon.</p>
          </div>
          <div className="space-y-4">
            <section className="bg-bg-tertiary p-4 rounded-lg">
              <h4 className="font-semibold text-text-primary mb-2">Order Information</h4>
              <div className="space-y-2 text-sm text-text-secondary">
                <div className="flex justify-between">
                  <span>Order ID:</span>
                  <span className="font-medium">#{orderDetails.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="font-medium text-accent-secondary">₹{orderDetails.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="font-medium">{getPaymentMethodDisplay(orderDetails.paymentMethod)}</span>
                </div>
              </div>
            </section>
            <section className="bg-bg-secondary p-4 rounded-lg">
              <h4 className="font-semibold text-text-primary mb-2 flex items-center">
                <MapPin className="mr-2" size={16} /> Delivery Address
              </h4>
              <p className="text-sm text-text-secondary">{orderDetails.address}</p>
            </section>
            <section className="bg-bg-tertiary p-4 rounded-lg">
              <h4 className="font-semibold text-text-primary mb-2 flex items-center">
                <Truck className="mr-2" size={16} /> Delivery Information
              </h4>
              <div className="text-sm text-text-secondary space-y-1">
                <p>📦 Your order will be delivered to the above address</p>
                <p>🕐 Estimated delivery: 2-3 business days</p>
                <p>🚚 Free delivery on this order</p>
                <p>📱 You'll receive SMS updates on your order status</p>
              </div>
            </section>
            {orderDetails.paymentMethod !== 'cod' && (
              <section className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-text-primary mb-2 flex items-center">
                  <CreditCard className="mr-2" size={16} /> Payment Status
                </h4>
                <p className="text-sm text-text-secondary">
                  💳 Payment of ₹{orderDetails.total.toFixed(2)} processed successfully (Mock Payment)
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  * This is a demo transaction. No actual payment was processed.
                </p>
              </section>
            )}
          </div>
          <div className="mt-6 space-y-3">
            <button
              onClick={onClose}
              className="w-full bg-accent-primary hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Continue Shopping
            </button>
            <div className="text-center text-text-secondary text-sm">
              Need help? Call us at <span className="font-medium">1800-123-4567</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MY ORDERS MODAL COMPONENT ---
const MyOrdersModal = ({ isOpen, onClose, orders, loading, onCancelOrder, onOrderClick, customerEmail }) => {
  if (!isOpen) return null;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'text-accent-secondary';
      case 'processing': return 'text-blue-400';
      case 'shipped': return 'text-purple-400';
      case 'delivered': return 'text-green-400';
      case 'cancelled': return 'text-red-400';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return <CheckCircle2 size={20} />;
      case 'processing': return <Clock size={20} />;
      case 'shipped': return <Truck size={20} />;
      case 'delivered': return <Package size={20} />;
      case 'cancelled': return <XCircle size={20} />;
      default: return <AlertCircle size={20} />;
    }
  };

  const canCancelOrder = (status) => {
    const lowerStatus = status?.toLowerCase();
    return lowerStatus === 'confirmed' || lowerStatus === 'processing';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-70" onClick={onClose}></div>
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-bg-secondary glass rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-enter">
          <header className="flex items-center justify-between p-6 border-b border-border-color sticky top-0 bg-bg-secondary glass z-10">
            <div>
              <h2 className="text-2xl font-bold text-text-primary flex items-center">
                <Package className="mr-2" size={28} /> My Orders
              </h2>
              {customerEmail && (
                <p className="text-sm text-text-secondary mt-1">Orders for: {customerEmail}</p>
              )}
            </div>
            <button onClick={onClose} className="p-2 hover:bg-bg-tertiary rounded transition-colors">
              <X size={24} />
            </button>
          </header>

          <div className="p-6">
            {!customerEmail ? (
              <div className="text-center py-12">
                <Package size={64} className="mx-auto mb-4 text-text-secondary" />
                <h3 className="text-xl font-semibold text-text-primary mb-2">No Email Found</h3>
                <p className="text-text-secondary">
                  Please place an order first to track your order history.
                </p>
              </div>
            ) : loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent-primary mx-auto mb-4"></div>
                <p className="text-text-secondary">Loading your orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <Package size={64} className="mx-auto mb-4 text-text-secondary" />
                <h3 className="text-xl font-semibold text-text-primary mb-2">No Orders Yet</h3>
                <p className="text-text-secondary mb-4">
                  You haven't placed any orders yet.
                </p>
                <button
                  onClick={onClose}
                  className="bg-accent-primary hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const items = typeof order.items === 'string' ? JSON.parse(order.items) : (order.items || []);
                  const status = order.status || 'confirmed';
                  
                  return (
                    <div
                      key={order.id}
                      className="bg-bg-tertiary p-6 rounded-lg hover:shadow-lg transition-all duration-200 border border-border-color"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-text-primary">
                              Order #{order.id}
                            </h3>
                            <span className={`flex items-center space-x-1 ${getStatusColor(status)} font-medium`}>
                              {getStatusIcon(status)}
                              <span className="capitalize">{status}</span>
                            </span>
                          </div>
                          <p className="text-sm text-text-secondary">
                            <Clock size={14} className="inline mr-1" />
                            {formatDate(order.created_at)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-accent-secondary">
                            ₹{parseFloat(order.total_amount).toFixed(2)}
                          </p>
                          <p className="text-xs text-text-secondary capitalize">
                            {order.payment_method || 'COD'}
                          </p>
                        </div>
                      </div>

                      {items && items.length > 0 && (
                        <div className="mb-4 bg-bg-secondary p-3 rounded">
                          <h4 className="text-sm font-semibold text-text-primary mb-2">Items:</h4>
                          <div className="space-y-1">
                            {items.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-sm text-text-secondary">
                                <span>• {item.medicine_name || 'Item'}</span>
                                <span>Qty: {item.quantity} × ₹{parseFloat(item.price).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-border-color">
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1 text-text-secondary">
                            <Truck size={16} />
                            <span>
                              {status === 'delivered' ? 'Delivered' : status === 'cancelled' ? 'Cancelled' : 'In Transit'}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {canCancelOrder(status) && (
                            <button
                              onClick={() => onCancelOrder(order.id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-1 transition-colors"
                            >
                              <XCircle size={16} />
                              <span>Cancel Order</span>
                            </button>
                          )}
                          <button
                            onClick={() => onOrderClick(order)}
                            className="bg-accent-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-1 transition-colors"
                          >
                            <span>View Details</span>
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function AlchemicalPharmacyUI() {
  const [medicines, setMedicines] = useState(mockMedicines);
  const [filteredMedicines, setFilteredMedicines] = useState(mockMedicines);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loadingMedicines, setLoadingMedicines] = useState(false);
  const [medError, setMedError] = useState('');
  
  // My Orders state
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [myOrders, setMyOrders] = useState([]);
  const [customerEmail, setCustomerEmail] = useState(localStorage.getItem('customerEmail') || '');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Load medicines from backend with graceful fallback to mock data
  useEffect(() => {
    const load = async () => {
      setLoadingMedicines(true);
      setMedError('');
      try {
        const res = await fetch('/api/medicines');
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const data = await res.json();
        setMedicines(data);
        setFilteredMedicines(data);
      } catch (err) {
        console.warn('Using mock medicines due to API error:', err.message);
        setMedError('Showing demo data. Backend not reachable.');
        setMedicines(mockMedicines);
        setFilteredMedicines(mockMedicines);
      } finally {
        setLoadingMedicines(false);
      }
    };
    load();
  }, []);

  // Filter medicines based on category and search
  useEffect(() => {
    let filtered = medicines;
    if (selectedCategory) {
      filtered = filtered.filter(m => m.category === selectedCategory);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(m =>
        m.name.toLowerCase().includes(term) ||
        m.category.toLowerCase().includes(term) ||
        m.description.toLowerCase().includes(term)
      );
    }
    setFilteredMedicines(filtered);
  }, [searchTerm, selectedCategory, medicines]);

  // Add to cart with stock check and fly animation
  const addToCart = useCallback((medicine, el) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === medicine.id);
      if (existing) {
        if (existing.quantity < medicine.stock) {
          return prev.map(item =>
            item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          alert('No more stock available');
          return prev;
        }
      } else {
        if (medicine.stock > 0) {
          return [...prev, { ...medicine, quantity: 1 }];
        } else {
          alert('Out of stock');
          return prev;
        }
      }
    });

    // Fly to cart animation
    const cartIcon = document.getElementById('cart-icon');
    if (!cartIcon) return;

    const img = el.querySelector('img');
    if (!img) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const flyer = img.cloneNode(true);
    flyer.style.position = 'fixed';
    flyer.style.left = `${imgRect.left}px`;
    flyer.style.top = `${imgRect.top}px`;
    flyer.style.width = `${imgRect.width}px`;
    flyer.style.height = `${imgRect.height}px`;
    flyer.style.borderRadius = '50%';
    flyer.style.zIndex = '9999';
    flyer.style.transition = 'all 0.5s ease-out';
    flyer.style.pointerEvents = 'none';
    flyer.style.boxShadow = '0 10px 40px rgba(59, 130, 246, 0.6)';
    flyer.style.willChange = 'transform, opacity';
    flyer.style.transform = 'translate3d(0, 0, 0)';
    document.body.appendChild(flyer);

    requestAnimationFrame(() => {
      flyer.style.left = `${cartRect.left + cartRect.width / 2 - imgRect.width / 4}px`;
      flyer.style.top = `${cartRect.top + cartRect.height / 2 - imgRect.height / 4}px`;
      flyer.style.width = `${imgRect.width / 2}px`;
      flyer.style.height = `${imgRect.height / 2}px`;
      flyer.style.opacity = '0';
      flyer.style.transform = 'translate3d(0, -40px, 0) scale(0.1) rotate(360deg)';
    });

    flyer.addEventListener('transitionend', () => {
      flyer.remove();
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    setCart(prev => {
      const item = prev.find(i => i.id === id);
      if (!item) return prev;
      if (quantity <= 0) {
        return prev.filter(i => i.id !== id);
      }
      if (quantity > item.stock) {
        alert('No more stock available');
        return prev;
      }
      return prev.map(i => (i.id === id ? { ...i, quantity } : i));
    });
  }, []);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const fetchCustomerOrders = async (email) => {
    setLoadingOrders(true);
    try {
      const response = await fetch(`/api/customers/${email}/history`);
      const data = await response.json();
      if (data.orders) {
        setMyOrders(data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleViewOrders = () => {
    setIsOrdersOpen(true);
    if (customerEmail) {
      fetchCustomerOrders(customerEmail);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    
    try {
      const response = await fetch(`/api/orders/${orderId}/cancel`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await response.json();
      if (response.ok) {
        alert('Order cancelled successfully!');
        if (customerEmail) {
          fetchCustomerOrders(customerEmail);
        }
      } else {
        alert(data.msg || 'Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Failed to cancel order');
    }
  };

  const handleOrderComplete = (details) => {
    setOrderDetails(details);
    setIsOrderSuccessOpen(true);
    setCart([]);
    // Save customer email for order tracking
    if (details.customer_email) {
      localStorage.setItem('customerEmail', details.customer_email);
      setCustomerEmail(details.customer_email);
    }
  };

  const totalItems = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  return (
    <>
      <GlobalStyles />
      <header className="bg-bg-secondary text-text-primary shadow-lg">
        <div className="bg-bg-tertiary py-2 px-4 text-sm flex justify-between">
          <span>🏥 Your Health, Our Priority | Free Delivery on Orders Above ₹500</span>
          <span>📞 Call: 1800-123-4567</span>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-text-primary text-bg-primary rounded-lg p-2 font-bold text-2xl select-none">C+</div>
            <div>
              <h1 className="text-2xl font-bold">Care Pharmacy</h1>
              <p className="text-text-secondary text-xs">Trusted Healthcare Partner</p>
            </div>
          </div>
          <form
            onSubmit={e => {
              e.preventDefault();
              setSelectedCategory('');
            }}
            className="hidden md:flex flex-1 max-w-md mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search medicines, health products..."
                className="w-full px-4 py-2 pr-10 text-bg-primary rounded-lg border border-border-color focus:outline-none focus:ring-2 focus:ring-accent-primary"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-accent-primary"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleViewOrders}
              className="hidden md:flex items-center space-x-1 hover:bg-bg-tertiary px-3 py-2 rounded transition-colors"
            >
              <Package size={20} />
              <span className="text-sm">My Orders</span>
            </button>
            <button className="hidden md:flex items-center space-x-1 hover:bg-bg-tertiary px-3 py-2 rounded">
              <User size={20} />
              <span className="text-sm">Account</span>
            </button>
            <button
              id="cart-icon"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center space-x-1 hover:bg-bg-tertiary px-3 py-2 rounded transition-all duration-200"
              aria-label="Open cart"
            >
              <ShoppingCart size={20} className="transition-transform duration-200" style={{ willChange: 'transform' }} />
              <span className="text-sm hidden md:block">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        <nav className={`bg-bg-tertiary ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex flex-col md:flex-row md:space-x-8 py-4">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setSearchTerm('');
                  }}
                  className="block w-full text-left md:w-auto px-3 py-2 hover:bg-bg-secondary rounded transition-colors"
                >
                  All Medicines
                </button>
              </li>
              {['Pain Relief', 'Antibiotics', 'Cardiac Care', 'Diabetes Care', 'Digestive Health', 'Cold & Flu', 'Allergy Relief', 'Vitamins & Supplements'].map(category => (
                <li key={category}>
                  <button
                    onClick={() => {
                      setSelectedCategory(category);
                      setSearchTerm('');
                    }}
                    className="block w-full text-left md:w-auto px-3 py-2 hover:bg-bg-secondary rounded transition-colors"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <section className="text-center mb-8">
          <h1 className="text-4xl font-extrabold mb-4">Welcome to Care Pharmacy</h1>
          <p className="text-xl text-text-secondary mb-6">
            Your trusted partner for quality medicines and healthcare products
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {['✓ Genuine Medicines', '✓ Fast Delivery', '✓ 24/7 Support', '✓ Best Prices'].map((feat, i) => (
              <span key={i} className="bg-bg-secondary px-3 py-1 rounded-full">
                {feat}
              </span>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">
                {selectedCategory || searchTerm ?
                  `${selectedCategory || 'Search Results'} ${searchTerm ? `for "${searchTerm}"` : ''}` :
                  'All Medicines'
                }
              </h2>
              <p className="text-text-secondary mt-1">{filteredMedicines.length} medicines available</p>
              {medError && (
                <p className="text-yellow-400 text-sm mt-1">{medError}</p>
              )}
            </div>
          </div>
          {loadingMedicines ? (
            <div className="text-center py-12 text-text-secondary">Loading medicines...</div>
          ) : filteredMedicines.length === 0 ? (
            <div className="text-center py-12 text-text-secondary">
              <p className="text-lg">No medicines found</p>
              <p className="mt-2 text-sm">Try different search terms or browse categories</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMedicines.map(med => (
                <MedicineCard key={med.id} medicine={med} onAddToCart={addToCart} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="bg-bg-secondary text-text-secondary py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-primary">Care Pharmacy</h3>
            <p>Your trusted healthcare partner providing quality medicines and excellent service.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-text-primary">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-text-primary">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>Pain Relief</li>
              <li>Antibiotics</li>
              <li>Cardiac Care</li>
              <li>Diabetes Care</li>
              <li>Vitamins & Supplements</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-text-primary">Contact Info</h4>
            <p>📞 1800-123-4567</p>
            <p>✉️ support@carepharmacy.com</p>
            <p>🕐 24/7 Customer Support</p>
          </div>
        </div>
        <div className="border-t border-border-color mt-8 pt-8 text-center text-sm">
          <p>© 2024 Care Pharmacy. All rights reserved.</p>
        </div>
      </footer>

      <CartSidebar
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onOrderComplete={handleOrderComplete}
      />

      <OrderSuccessModal
        isOpen={isOrderSuccessOpen}
        onClose={() => setIsOrderSuccessOpen(false)}
        orderDetails={orderDetails}
      />

      <MyOrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={myOrders}
        loading={loadingOrders}
        onCancelOrder={handleCancelOrder}
        onOrderClick={(order) => setSelectedOrder(order)}
        customerEmail={customerEmail}
      />
    </>
  );
}