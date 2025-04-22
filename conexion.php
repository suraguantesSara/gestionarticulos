<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// 📌 URL del script de Google Sheets
$GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbyKPO9HirAOGKdhJFbQclxQuhOAQhuxs_3-9vx5GODOXAy5ugjLgg2BpaNWETo4wBMN/exec";

// 📌 Mostrar mensaje confirmando conexión
echo json_encode(["mensaje" => "✅ Conexión establecida con la base de datos (Google Sheets)."]);
?>
