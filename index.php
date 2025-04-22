<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// 📌 URL del script de Google Sheets
$GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbzTB-Io2LyQoAC3vrCgShuosvWpXmW9K3OLuoUr6CmAAIYo_5mH_Shep6f043zW103Q/exec";

// 📌 Mostrar mensaje confirmando conexión
echo json_encode(["mensaje" => "✅ Conexión establecida con la base de datos (Google Sheets)."]);
?>
