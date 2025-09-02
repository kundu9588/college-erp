Write-Host "🔄 Syncing with main branch..." -ForegroundColor Cyan
Write-Host ""

# Switch to main
git checkout main
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to switch to main branch" -ForegroundColor Red
    exit 1
}

# Pull latest changes
git pull origin main
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Successfully synced with main branch!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Current branches:" -ForegroundColor Yellow
    git branch -a
} else {
    Write-Host "❌ Failed to pull latest changes" -ForegroundColor Red
    exit 1
}
