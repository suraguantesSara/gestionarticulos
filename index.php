<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// 📌 URL del script de Google Sheets
$GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbzTB-Io2LyQoAC3vrCgShuosvWpXmW9K3OLuoUr6CmAAIYo_5mH_Shep6f043zW103Q/exec";

// 📌 Obtener los datos enviados en la solicitud
$inputData = json_decode(file_get_contents("php://input"), true);

// 📌 Validar que haya datos
if (!$inputData || empty($inputData)) {
    echo json_encode(["mensaje" => "❌ Error: No se enviaron datos válidos."]);
    http_response_code(400);
    exit();
}

// 📌 Enviar datos a Google Sheets usando `cURL`
$ch = curl_init($GOOGLE_SHEETS_URL);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($inputData));
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);

$response = curl_exec($ch);
$httpStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpStatus !== 200) {
    echo json_encode(["mensaje" => "❌ Error al registrar el pedido", "error" => $httpStatus]);
    http_response_code(500);
    exit();
}

// 📌 Devolver la respuesta de Google Sheets
echo $response;
?>
