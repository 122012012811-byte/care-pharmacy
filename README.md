# 🏥 Care Pharmacy - Full Stack E-Commerce Website

A modern, fully functional pharmacy e-commerce website with a beautiful dark theme inspired by Apollo Pharmacy.

## ✨ Features

- 🎨 Beautiful dark-themed UI with smooth animations
- 💊 Browse and search medicines catalog
- 🛒 Shopping cart with "fly-to-cart" animations
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🔍 Category filtering and search functionality
- 💳 Complete checkout flow with multiple payment options (COD, UPI, Card - demo mode)
- 📦 Order confirmation with order ID
- 🔄 Real-time stock management
- 🌐 Network access (accessible from other devices on same WiFi)

## 🚀 Quick Start

### Option 1: Using Startup Script (Easiest)
1. Right-click `start-servers.ps1`
2. Select "Run with PowerShell"
3. Website will automatically open in your browser!

### Option 2: Manual Start

**Start Backend:**
```powershell
cd server
node server.js
```

**Start Frontend (in new terminal):**
```powershell
cd client
npm run dev
```

## 🌐 Access URLs

- **Website**: http://localhost:3000/
- **Network Access**: http://192.168.1.8:3000/ (from phone/other devices)
- **Backend API**: http://localhost:5001/

## 🛑 Stop Servers

### Option 1: Using Stop Script
Run `stop-servers.ps1`

### Option 2: Manual
Close the PowerShell windows or press `Ctrl+C` in each terminal

## 📁 Project Structure

```
care-pharmacy/
├── client/              # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx     # Main application component
│   │   ├── main.jsx    # Entry point
│   │   └── index.css   # Tailwind styles
│   ├── index.html      # HTML template
│   └── package.json    # Frontend dependencies
├── server/             # Express backend
│   ├── server.js       # API server with mock data
│   └── package.json    # Backend dependencies
├── database/           # SQL schema (optional - not required for demo)
│   └── setup.sql       # MySQL database setup
├── start-servers.ps1   # Start both servers
└── stop-servers.ps1    # Stop all servers
```

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite 5
- Tailwind CSS
- Lucide React (icons)

**Backend:**
- Node.js
- Express 4
- CORS
- Mock data (no database required)

## 📦 Available API Endpoints

- `GET /api/medicines` - Get all medicines
- `GET /api/medicines/:id` - Get single medicine
- `POST /api/orders` - Place an order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order

## 🎯 How to Use the Website

1. **Browse Medicines**: View the medicine catalog on the homepage
2. **Search**: Use the search bar to find specific medicines
3. **Filter by Category**: Click category buttons (Pain Relief, Cardiac Care, etc.)
4. **Add to Cart**: Click "Add" button on any medicine card
5. **View Cart**: Click the cart icon in the header
6. **Adjust Quantity**: Use +/- buttons in the cart
7. **Checkout**: Click "Proceed to Checkout" in the cart
8. **Fill Details**: Enter customer information and delivery address
9. **Select Payment**: Choose COD, UPI, or Card (demo mode)
10. **Place Order**: Submit order and get confirmation with order ID

## 💡 Notes

- The website uses mock data stored in memory (no database required)
- Stock levels update when orders are placed
- All payment options are in demo mode (no actual payment processing)
- Order data is stored in memory (resets when server restarts)

## 📱 Access from Phone

1. Make sure your phone is on the same WiFi network
2. Open browser and go to: `http://192.168.1.8:3000/`
3. Enjoy shopping from your mobile device!

## 🎨 Animations & Effects

- Smooth fade-in animations for medicine cards
- "Fly-to-cart" effect when adding items
- Slide-in cart sidebar
- Modal animations for checkout and success screens
- Hover effects on all interactive elements

## 🔧 Troubleshooting

**Port already in use?**
- The backend will automatically try port 5001 if 5000 is busy
- Frontend will automatically find an available port starting from 3000

**Can't access from phone?**
- Check that both devices are on the same WiFi
- Check Windows Firewall settings
- Try the different network URLs shown in the terminal

**Website not loading?**
- Make sure both servers are running
- Check that ports 3000 and 5001 are not blocked
- Try refreshing the browser

---

Made with ❤️ for Care Pharmacy
