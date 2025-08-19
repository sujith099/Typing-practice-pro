# PowerShell script to install dependencies for the TypeScript Typing Practice Application

Write-Host "Installing dependencies for TypeScript Typing Practice Application..." -ForegroundColor Green

# Check if npm is installed
try {
    npm -v | Out-Null
    Write-Host "npm is installed. Proceeding with installation..." -ForegroundColor Green
} catch {
    Write-Host "Error: npm is not installed. Please install Node.js and npm first." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "Installing project dependencies..." -ForegroundColor Yellow
npm install

# Check if installation was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "Dependencies installed successfully!" -ForegroundColor Green
    Write-Host "
To start the development server, run:" -ForegroundColor Cyan
    Write-Host "npm run dev" -ForegroundColor White
    Write-Host "
Then open http://localhost:3000 in your browser." -ForegroundColor Cyan
} else {
    Write-Host "Error: Failed to install dependencies." -ForegroundColor Red
}