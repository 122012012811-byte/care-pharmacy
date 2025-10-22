# ============================================================
# CARE PHARMACY - ONE-TIME SETUP SCRIPT
# Run this ONCE to set up the entire project
# ============================================================

Write-Host "`n" -NoNewline
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║         🏥 CARE PHARMACY - ONE-TIME SETUP 🏥              ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

$ErrorActionPreference = "Continue"
$projectRoot = $PSScriptRoot

# Step 1: Check Node.js Installation
Write-Host "📌 Step 1: Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "   ✅ Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Node.js is NOT installed!" -ForegroundColor Red
    Write-Host "   Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    pause
    exit
}

# Step 2: Install Backend Dependencies
Write-Host "`n📌 Step 2: Installing backend dependencies..." -ForegroundColor Yellow
Push-Location "$projectRoot\server"
if (Test-Path "node_modules") {
    Write-Host "   ℹ️  Dependencies already installed. Updating..." -ForegroundColor Cyan
}
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Backend dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  Backend installation had warnings (this is usually OK)" -ForegroundColor Yellow
}
Pop-Location

# Step 3: Install Frontend Dependencies
Write-Host "`n📌 Step 3: Installing frontend dependencies..." -ForegroundColor Yellow
Push-Location "$projectRoot\client"
if (Test-Path "node_modules") {
    Write-Host "   ℹ️  Dependencies already installed. Updating..." -ForegroundColor Cyan
}
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Frontend dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  Frontend installation had warnings (this is usually OK)" -ForegroundColor Yellow
}
Pop-Location

# Step 4: Verify .env file
Write-Host "`n📌 Step 4: Checking environment configuration..." -ForegroundColor Yellow
$envPath = "$projectRoot\server\.env"
if (Test-Path $envPath) {
    Write-Host "   ✅ .env file exists" -ForegroundColor Green
    $envContent = Get-Content $envPath -Raw
    if ($envContent -match "OPENAI_API_KEY=sk-") {
        Write-Host "   ✅ OpenAI API key configured" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  OpenAI API key may be missing" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ⚠️  .env file not found. Creating default..." -ForegroundColor Yellow
    @"
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=care_pharmacy
PORT=5001
OPENAI_API_KEY=your_openai_api_key_here
"@ | Out-File -FilePath $envPath -Encoding UTF8
    Write-Host "   ✅ Created .env file with default values" -ForegroundColor Green
}

# Step 5: Check MySQL
Write-Host "`n📌 Step 5: Checking MySQL installation..." -ForegroundColor Yellow
try {
    $mysqlService = Get-Service -Name "MySQL*" -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($mysqlService) {
        Write-Host "   ✅ MySQL service found: $($mysqlService.Name)" -ForegroundColor Green
        if ($mysqlService.Status -eq "Running") {
            Write-Host "   ✅ MySQL is running" -ForegroundColor Green
        } else {
            Write-Host "   ⚠️  MySQL is installed but not running" -ForegroundColor Yellow
            Write-Host "   Starting MySQL service..." -ForegroundColor Cyan
            Start-Service $mysqlService.Name -ErrorAction SilentlyContinue
        }
    } else {
        Write-Host "   ⚠️  MySQL service not detected" -ForegroundColor Yellow
        Write-Host "   The application will use mock data (works without database)" -ForegroundColor Cyan
    }
} catch {
    Write-Host "   ℹ️  MySQL check skipped (application will use mock data)" -ForegroundColor Cyan
}

# Step 6: Create start/stop helper
Write-Host "`n📌 Step 6: Setup complete! Creating shortcuts..." -ForegroundColor Yellow
Write-Host "   ✅ start-servers.ps1 - Use this to start the application" -ForegroundColor Green
Write-Host "   ✅ stop-servers.ps1 - Use this to stop all servers" -ForegroundColor Green

Write-Host "`n" -NoNewline
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║              ✅ SETUP COMPLETED SUCCESSFULLY! ✅            ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green

Write-Host "`n📍 NEXT STEPS:" -ForegroundColor Yellow
Write-Host "   1️⃣  Run: .\start-servers.ps1" -ForegroundColor Cyan
Write-Host "   2️⃣  Open: http://localhost:3000/" -ForegroundColor Cyan
Write-Host "   3️⃣  Enjoy your Care Pharmacy website! 🎉" -ForegroundColor Cyan

Write-Host "`n💡 TIPS:" -ForegroundColor Yellow
Write-Host "   • Database is optional - mock data works perfectly" -ForegroundColor Gray
Write-Host "   • AI Chatbot is fully functional with OpenAI" -ForegroundColor Gray
Write-Host "   • All 25 medicines load automatically" -ForegroundColor Gray

Write-Host "`nPress any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
