<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require "vendor/autoload.php";
use Dompdf\Dompdf;

$spreadsheetId = "1P1QQhPe8rrWMMzBe4xl4mnKgSqWxDf8VLlJVl2MrZHU";
$scriptUrl = "https://script.google.com/macros/s/AKfycbx8ML4x4bf2SjKNXYZj0xp84u6800fkBSURijAlJhpOHsNdj__W9PsfMRjXW8twLmqL/exec";

if (isset($_GET["filtro"]) && isset($_GET["valor"])) {
    $filtro = $_GET["filtro"];
    $valor = $_GET["valor"];
    
    $url = "$scriptUrl?spreadsheetId=$spreadsheetId&hoja=articulos&filtro=$filtro&valor=$valor";

    // 📌 Usar cURL para obtener la respuesta
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Evitar problemas de certificado
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

    $response = curl_exec($ch);
    curl_close($ch);

    header("Content-Type: application/json");

    // 📌 Imprimir respuesta JSON en la consola para depuración
    echo json_encode(["debug_response" => $response]);

    if (!$response) {
        echo json_encode(["error" => "❌ No se pudo obtener datos de Google Sheets."]);
        exit();
    }

    // 📌 Detectar contenido HTML en la respuesta
    if (strpos($response, "<") !== false) {
        echo json_encode(["error" => "❌ Respuesta en formato incorrecto. Verifica el Apps Script."]);
        exit();
    }

    $jsonData = json_decode($response, true);
    if ($jsonData === null) {
        echo json_encode(["error" => "❌ Respuesta inválida de Google Sheets."]);
        exit();
    }

    echo json_encode($jsonData);
    exit();
}
?>
