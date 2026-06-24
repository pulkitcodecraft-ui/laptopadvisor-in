# Run PowerShell as Administrator, then:
#   cd engineering-laptop-advisor
#   .\scripts\allow-mobile-firewall.ps1

$ruleName = "Next.js Dev Server 3000"

netsh advfirewall firewall delete rule name="$ruleName" 2>$null | Out-Null
netsh advfirewall firewall add rule name="$ruleName" dir=in action=allow protocol=TCP localport=3000 profile=private

Write-Host ""
Write-Host "Firewall rule added for port 3000 (Private network only)." -ForegroundColor Green
Write-Host "On your phone (same WiFi), open:" -ForegroundColor Yellow

$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {
  $_.IPAddress -notlike '127.*' -and $_.PrefixOrigin -ne 'WellKnown'
} | Select-Object -First 1).IPAddress

if ($ip) {
  Write-Host "  http://${ip}:3000" -ForegroundColor Cyan
} else {
  Write-Host "  http://YOUR-PC-IP:3000" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Do NOT use localhost on mobile — it only works on this PC." -ForegroundColor Gray
