<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require "vendor/autoload.php";
use Dompdf\Dompdf;

$spreadsheetId = "1P1QQhPe8rrWMMzBe4xl4mnKgSqWxDf8VLlJVl2MrZHU";
$scriptUrl = "https://script.google.com/macros/s/AKfycbwnENwvtqA57UY0K50x6nJndeFzEWcVf_lPw1b3evT--RVqmyi5u_dhZdyJl4U5Z5qU/exec";

if (isset($_GET["filtro"]) && isset($_GET["valor"])) {
    $filtro = $_GET["filtro"];
    $valor = $_GET["valor"];
    
    $url = "$scriptUrl?spreadsheetId=$spreadsheetId&hoja=articulos&filtro=$filtro&valor=$valor";
    $response = @file_get_contents($url);

    header("Content-Type: application/json");

    if (!$response) {
        echo json_encode(["error" => "❌ No se pudo obtener datos de Google Sheets."]);
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
