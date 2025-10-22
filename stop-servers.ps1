# ============================================================
# CARE PHARMACY - STOP SERVERS SCRIPT
# Run this script to stop all running servers safely
# ============================================================

Write-Host "`n" -NoNewline
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Red
Write-Host "║          🛑 STOPPING CARE PHARMACY SERVERS 🛑             ║" -ForegroundColor Red
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Red
Write-Host ""

# Find all Node.js processes
$nodeProcesses = Get-Process node -ErrorAction SilentlyContinue

if ($nodeProcesses) {
    Write-Host "🔍 Found $($nodeProcesses.Count) Node.js process(es) running" -ForegroundColor Yellow
    Write-Host "   Stopping all servers..." -ForegroundColor Yellow
    
    Stop-Process -Name node -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
    
    # Verify they're stopped
    $remainingProcesses = Get-Process node -ErrorAction SilentlyContinue
    if (-not $remainingProcesses) {
        Write-Host "`n✅ All servers stopped successfully!" -ForegroundColor Green
    } else {
        Write-Host "`n⚠️  Some processes may still be running" -ForegroundColor Yellow
    }
} else {
    Write-Host "ℹ️  No Node.js servers currently running" -ForegroundColor Cyan
}

# Check if ports are freed
Write-Host "`n🔍 Verifying ports are freed..." -ForegroundColor Yellow
$port5001 = Get-NetTCPConnection -LocalPort 5001 -State Listen -ErrorAction SilentlyContinue
$port3000 = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue

if (-not $port5001) {
    Write-Host "   ✅ Port 5001 (Backend): FREE" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  Port 5001: Still in use" -ForegroundColor Yellow
}

if (-not $port3000) {
    Write-Host "   ✅ Port 3000 (Frontend): FREE" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  Port 3000: Still in use" -ForegroundColor Yellow
}

Write-Host "`n" -NoNewline
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                  ✅ SHUTDOWN COMPLETE ✅                   ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green

Write-Host "`n💡 To start the servers again, run: .\start-servers.ps1`n" -ForegroundColor Cyan

Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
