Add-Type -AssemblyName System.Drawing

$inputPath = 'C:\Users\91821\.gemini\antigravity\brain\77443d09-0523-49ed-8139-0771a43b17e9\.user_uploaded\media_1788599358911.png'
$outDir = 'C:\Users\91821\.gemini\antigravity\scratch\teachers-day-5d\assets'

$img = [System.Drawing.Image]::FromFile($inputPath)

function Crop-Pixel ($name, $x, $y, $w, $h) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $w, $h)), $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $outPath = Join-Path $outDir "$name.jpg"
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $bmp.Dispose()
    Write-Host "Saved $name to $outPath"
}

Crop-Pixel "hero_teacher_scene" 198 30 278 200
Crop-Pixel "about_teacher_male" 215 310 240 165
Crop-Pixel "gallery_card_1" 44 527 90 84
Crop-Pixel "gallery_card_2" 146 527 90 84
Crop-Pixel "gallery_card_3" 248 527 90 84
Crop-Pixel "gallery_card_4" 350 527 90 84
Crop-Pixel "cta_teacher_wave" 22 926 102 82
Crop-Pixel "cta_gift_box" 382 926 84 82

$img.Dispose()
