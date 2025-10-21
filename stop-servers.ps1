# Care Pharmacy - Stop All Servers
# This script stops all running node processes

Write-Host "`n🛑 Stopping Care Pharmacy Servers...`n" -ForegroundColor Red

$nodeProcesses = Get-Process node -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    Write-Host "Found $($nodeProcesses.Count) Node.js process(es) running..." -ForegroundColor Yellow
    Stop-Process -Name node -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
    Write-Host "✅ All servers stopped!`n" -ForegroundColor Green
} else {
    Write-Host "ℹ️ No Node.js processes running`n" -ForegroundColor Gray
}

Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
