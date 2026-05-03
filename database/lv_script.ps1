$allProducts = @()

$token = '$token = "301e565fc4f04d0aa907d374043d7889"'

for ($n = 0; $n -le 42; $n++) {
    $url = "https://api.loyverse.com/v1.0/items?page=$n&limit=100"
    $headers = @{Authorization = "Bearer $token"}
    
    $response = Invoke-WebRequest -Uri $url -Headers $headers -UseBasicParsing
    $json = $response.Content | ConvertFrom-Json
	# See what properties exist
	$json | ConvertTo-Json -Depth 3
	
	Write-Output "Page $n returned $($json.items.Count) items"
	
    }

for ($n = 0; $n -le 17; $n++) {
    $url = "https://api.loyverse.com/v1.0/items?page=$n&limit=100"
    $headers = @{Authorization = "Bearer $token"}

    $response = Invoke-WebRequest -Uri $url -Headers $headers -UseBasicParsing
    $json = $response.Content | ConvertFrom-Json

    foreach ($item in $json.items) {
        foreach ($variant in $item.variants) {
            $obj = [PSCustomObject]@{
                item_name     = $item.item_name
                default_price = $variant.cost
                cost          = $variant.default_price
            }
            $allProducts += $obj
        }
    }
}

# Save everything into one JSON file
$allProducts | ConvertTo-Json -Depth 5 | Out-File "C:/Users/Renz/melpharma/Loyverse/data.json"