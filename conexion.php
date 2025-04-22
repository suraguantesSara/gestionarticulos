<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// 📌 URL del script de Google Sheets
$GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbxjgM26a_h5B3myezn7el5OrFQ5MG3VybT8qQr4eS97RVs8O6A-S3VY8VySoE25jkYC/exec";

// 📌 Mostrar mensaje confirmando conexión
echo json_encode(["mensaje" => "✅ Conexión establecida con la base de datos (Google Sheets)."]);
?>
