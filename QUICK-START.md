# ============================================================
# CARE PHARMACY - QUICK START GUIDE
# ============================================================

## 🚀 FIRST TIME SETUP (Run ONCE)

1. **Run Setup Script:**
   ```powershell
   .\SETUP-GUIDE.ps1
   ```
   This will:
   - Check Node.js installation
   - Install all dependencies automatically
   - Verify environment configuration
   - Check MySQL (optional)

## 🏃 DAILY USAGE

### Start the Application:
```powershell
.\start-servers.ps1
```
- Opens 2 PowerShell windows (Backend & Frontend)
- Automatically opens your browser
- Website available at: http://localhost:3000/

### Stop the Application:
```powershell
.\stop-servers.ps1
```
- Stops all servers safely
- Frees up ports 3000 and 5001

## 📁 PROJECT STRUCTURE

```
care-pharmacy/
├── client/          # React Frontend (Port 3000)
├── server/          # Express Backend (Port 5001)
├── database/        # MySQL Schemas (Optional)
├── SETUP-GUIDE.ps1  # One-time setup script ⭐
├── start-servers.ps1 # Daily startup script ⭐
└── stop-servers.ps1  # Shutdown script ⭐
```

## ✅ FEATURES

- 🏥 **25 Indian Medicines** with images
- 🤖 **AI Chatbot** powered by OpenAI
- 🛒 **Shopping Cart** with animations
- 📦 **Order Management** (tracking & cancellation)
- 💳 **Mock Payments** (COD, UPI, Card)
- 📱 **Responsive Design** (mobile-friendly)
- 🎨 **Dark Theme** with smooth animations

## ❓ TROUBLESHOOTING

### Problem: "Dependencies not installed"
**Solution:** Run `.\SETUP-GUIDE.ps1` first

### Problem: "Port already in use"
**Solution:** Run `.\stop-servers.ps1` then `.\start-servers.ps1`

### Problem: "White page in browser"
**Solution:** Wait 10 seconds for Vite to compile, then refresh

### Problem: "Chatbot not responding"
**Solution:** Chatbot has smart fallback - it works even if OpenAI is down

### Problem: "Database error"
**Solution:** App works perfectly with mock data (database is optional)

## 🔧 MANUAL COMMANDS (if needed)

### Install Dependencies:
```powershell
cd server && npm install
cd ../client && npm install
```

### Start Backend Only:
```powershell
cd server
node server.js
```

### Start Frontend Only:
```powershell
cd client
npm run dev
```

### Stop All Servers:
```powershell
taskkill /F /IM node.exe
```

## 📞 SUPPORT

If you encounter issues:
1. Run `.\stop-servers.ps1`
2. Run `.\SETUP-GUIDE.ps1`
3. Run `.\start-servers.ps1`

This should fix 99% of problems!

## 🎯 QUICK TEST

After starting servers, test these URLs:
- Frontend: http://localhost:3000/
- Backend API: http://localhost:5001/api/medicines
- Health Check: http://localhost:5001/

All working? You're ready to go! 🎉
