# Care Pharmacy - Start Servers
Write-Host "`nStarting Care Pharmacy Servers...`n" -ForegroundColor Cyan

# Stop existing servers
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

# Start Backend
Write-Host "Starting Backend (Port 5001)..." -ForegroundColor Yellow
$backendCmd = "cd '$PSScriptRoot\server'; node server.js"
Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendCmd

Start-Sleep -Seconds 3

# Start Frontend
Write-Host "Starting Frontend (Port 3000)..." -ForegroundColor Yellow
$frontendCmd = "cd '$PSScriptRoot\client'; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendCmd

Write-Host "`nWaiting for servers to start..." -ForegroundColor Cyan
Start-Sleep -Seconds 8

Write-Host "`nServers Started!`n" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000/" -ForegroundColor Cyan
Write-Host "Backend:  http://localhost:5001/`n" -ForegroundColor Cyan

Start-Sleep -Seconds 2
Start-Process "http://localhost:3000/"

Write-Host "Press any key to exit (servers will keep running)..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
