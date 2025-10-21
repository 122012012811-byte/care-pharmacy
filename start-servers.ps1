# Care Pharmacy - Startup Script
# This script starts both backend and frontend servers

Write-Host "`n🏥 Starting Care Pharmacy Servers...`n" -ForegroundColor Cyan

# Start Backend Server
Write-Host "📦 Starting Backend Server (Port 5001)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\server'; node server.js" -WindowStyle Normal

Start-Sleep -Seconds 2

# Start Frontend Server  
Write-Host "🌐 Starting Frontend Server (Port 3000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\client'; npm run dev" -WindowStyle Normal

Start-Sleep -Seconds 5

Write-Host "`n✅ Servers Started Successfully!`n" -ForegroundColor Green
Write-Host "🌐 Frontend: http://localhost:3000/" -ForegroundColor Cyan
Write-Host "📱 Network: http://192.168.1.8:3000/" -ForegroundColor Cyan
Write-Host "🔧 Backend API: http://localhost:5001/`n" -ForegroundColor Cyan

# Open browser
Write-Host "🚀 Opening website in browser...`n" -ForegroundColor Magenta
Start-Sleep -Seconds 3
Start-Process "http://localhost:3000/"

Write-Host "Press any key to exit this window (servers will continue running)..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
