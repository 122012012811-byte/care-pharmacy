# ============================================
# Care Pharmacy - Database Setup Script
# ============================================

Write-Host "`n🏥 Care Pharmacy - Database Setup`n" -ForegroundColor Cyan

# Check if MySQL is accessible
Write-Host "Checking MySQL installation..." -ForegroundColor Yellow

try {
    $mysqlPath = Get-Command mysql -ErrorAction Stop
    Write-Host "✅ MySQL found at: $($mysqlPath.Source)" -ForegroundColor Green
} catch {
    Write-Host "❌ MySQL not found in PATH" -ForegroundColor Red
    Write-Host "`nPlease install MySQL Server from:" -ForegroundColor Yellow
    Write-Host "https://dev.mysql.com/downloads/mysql/`n" -ForegroundColor Cyan
    Write-Host "After installation, add MySQL bin directory to PATH" -ForegroundColor Yellow
    Write-Host "Example: C:\Program Files\MySQL\MySQL Server 8.0\bin`n" -ForegroundColor Gray
    
    $response = Read-Host "Do you want to continue anyway? (y/n)"
    if ($response -ne 'y') {
        exit
    }
}

Write-Host "`n📋 Setup Instructions:" -ForegroundColor Cyan
Write-Host "=====================`n" -ForegroundColor Cyan

Write-Host "1. Make sure MySQL Server is running" -ForegroundColor White
Write-Host "2. You'll need your MySQL root password" -ForegroundColor White
Write-Host "3. The script will create 'care_pharmacy' database" -ForegroundColor White
Write-Host "4. Sample data (25 medicines) will be inserted`n" -ForegroundColor White

$continue = Read-Host "Ready to proceed? (y/n)"
if ($continue -ne 'y') {
    Write-Host "`nSetup cancelled.`n" -ForegroundColor Yellow
    exit
}

Write-Host "`n🔐 MySQL Credentials" -ForegroundColor Cyan
Write-Host "===================`n" -ForegroundColor Cyan

$username = Read-Host "MySQL Username (default: root)"
if ([string]::IsNullOrWhiteSpace($username)) {
    $username = "root"
}

$password = Read-Host "MySQL Password" -AsSecureString
$passwordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($password)
)

Write-Host "`n🗄️ Creating database..." -ForegroundColor Yellow

# Check if database setup file exists
$setupFile = ".\database\setup-new.sql"
if (-not (Test-Path $setupFile)) {
    Write-Host "❌ Database setup file not found: $setupFile" -ForegroundColor Red
    exit
}

# Execute SQL file
try {
    if ([string]::IsNullOrWhiteSpace($passwordPlain)) {
        mysql -u $username < $setupFile 2>&1 | Out-Null
    } else {
        mysql -u $username -p"$passwordPlain" < $setupFile 2>&1 | Out-Null
    }
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Database created successfully!" -ForegroundColor Green
        Write-Host "✅ Tables created: customers, medicines, orders, order_items, transactions" -ForegroundColor Green
        Write-Host "✅ Sample data inserted: 25 medicines" -ForegroundColor Green
    } else {
        throw "MySQL command failed"
    }
} catch {
    Write-Host "❌ Database setup failed" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    Write-Host "`n💡 Try running manually in MySQL Workbench:" -ForegroundColor Yellow
    Write-Host "   1. Open MySQL Workbench" -ForegroundColor Gray
    Write-Host "   2. Open file: database/setup-new.sql" -ForegroundColor Gray
    Write-Host "   3. Click Execute (⚡ lightning icon)`n" -ForegroundColor Gray
    exit
}

Write-Host "`n📝 Updating .env file..." -ForegroundColor Yellow

# Update .env file
$envPath = ".\server\.env"
$envContent = @"
DB_HOST=localhost
DB_USER=$username
DB_PASSWORD=$passwordPlain
DB_DATABASE=care_pharmacy
PORT=5001
"@

$envContent | Out-File -FilePath $envPath -Encoding utf8 -Force
Write-Host "✅ Configuration saved to server/.env" -ForegroundColor Green

Write-Host "`n🧪 Testing connection..." -ForegroundColor Yellow

# Test connection
try {
    if ([string]::IsNullOrWhiteSpace($passwordPlain)) {
        $testResult = mysql -u $username -e "USE care_pharmacy; SELECT COUNT(*) as count FROM medicines;" 2>&1
    } else {
        $testResult = mysql -u $username -p"$passwordPlain" -e "USE care_pharmacy; SELECT COUNT(*) as count FROM medicines;" 2>&1
    }
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Database connection successful!" -ForegroundColor Green
        Write-Host "✅ Medicines table verified" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️ Connection test had issues, but setup may have succeeded" -ForegroundColor Yellow
}

Write-Host "`n✨ Database Setup Complete!`n" -ForegroundColor Green

Write-Host "📊 Database Details:" -ForegroundColor Cyan
Write-Host "===================" -ForegroundColor Cyan
Write-Host "Database: care_pharmacy" -ForegroundColor White
Write-Host "Tables: 5 (customers, medicines, orders, order_items, transactions)" -ForegroundColor White
Write-Host "Sample Data: 25 medicines" -ForegroundColor White
Write-Host "Location: localhost:3306`n" -ForegroundColor White

Write-Host "🚀 Next Steps:" -ForegroundColor Cyan
Write-Host "=============" -ForegroundColor Cyan
Write-Host "1. Start the backend server:" -ForegroundColor White
Write-Host "   cd server" -ForegroundColor Gray
Write-Host "   node server.js`n" -ForegroundColor Gray
Write-Host "2. Or use the startup script:" -ForegroundColor White
Write-Host "   .\start-servers.ps1`n" -ForegroundColor Gray
Write-Host "3. Place orders through the website" -ForegroundColor White
Write-Host "4. Check MySQL to see customer history and transactions!`n" -ForegroundColor White

Write-Host "📚 For more details, see: DATABASE_SETUP.md`n" -ForegroundColor Cyan

$restart = Read-Host "Start servers now? (y/n)"
if ($restart -eq 'y') {
    Write-Host "`n🚀 Starting servers...`n" -ForegroundColor Yellow
    & .\start-servers.ps1
}
