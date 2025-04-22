<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require "vendor/autoload.php";
use Dompdf\Dompdf;

$spreadsheetId = "1P1QQhPe8rrWMMzBe4xl4mnKgSqWxDf8VLlJVl2MrZHU";
$scriptUrl = "https://script.google.com/macros/s/AKfycbx8ML4x4bf2SjKNXYZj0xp84u6800fkBSURijAlJhpOHsNdj__W9PsfMRjXW8twLmqL/exec";

// 📌 Función para limpiar etiquetas HTML y caracteres no deseados
function limpiarHTML($string) {
    return strip_tags(trim($string));
}

if (isset($_GET["filtro"]) && isset($_GET["valor"])) {
    $filtro = $_GET["filtro"];
    $valor = $_GET["valor"];
    
    $url = "$scriptUrl?spreadsheetId=$spreadsheetId&hoja=articulos&filtro=$filtro&valor=$valor";

    // 📌 Usar cURL para obtener la respuesta
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

    $response = curl_exec($ch);
    curl_close($ch);

    header("Content-Type: application/json");

    // 📌 Validar si la respuesta tiene HTML y limpiarla
    $responseLimpiado = limpiarHTML($response);

    // 📌 Imprimir respuesta JSON para depuración
    echo json_encode(["debug_response" => $responseLimpiado]);

    if (!$responseLimpiado || strpos($responseLimpiado, "<") !== false) {
        echo json_encode(["error" => "❌ Respuesta en formato incorrecto. Verifica el Apps Script."]);
        exit();
    }

    $jsonData = json_decode($responseLimpiado, true);

    // 📌 Verificar si la conversión a JSON fue exitosa
    if ($jsonData === null || json_last_error() !== JSON_ERROR_NONE) {
        echo json_encode(["error" => "❌ Respuesta inválida de Google Sheets."]);
        exit();
    }

    echo json_encode($jsonData);
    exit();
}
?>
