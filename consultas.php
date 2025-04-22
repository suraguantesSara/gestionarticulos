<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require "vendor/autoload.php";
use Dompdf\Dompdf;

$spreadsheetId = "1P1QQhPe8rrWMMzBe4xl4mnKgSqWxDf8VLlJVl2MrZHU";
$scriptUrl = "https://script.google.com/macros/s/AKfycbzvLppinMAQ5ycHNdLh2AUG34TraTdlU8oqbre6XPjh-WC2ZvKAQlLVr7Uw4lxf_2ug/exec";

// 📌 Manejar consulta de pedidos
if (isset($_GET["filtro"]) && isset($_GET["valor"])) {
    $filtro = $_GET["filtro"];
    $valor = $_GET["valor"];
    
    $url = "$scriptUrl?spreadsheetId=$spreadsheetId&hoja=articulos&filtro=$filtro&valor=$valor";
    $response = @file_get_contents($url);

    // 📌 Mostrar la respuesta para depuración
    header("Content-Type: application/json");
    echo json_encode(["debug_response" => $response]);

    if (!$response) {
        echo json_encode(["error" => "❌ No se pudo obtener datos de Google Sheets."]);
        exit();
    }

    // 📌 Verificar que la respuesta es JSON válida
    $jsonData = json_decode($response, true);
    if ($jsonData === null) {
        echo json_encode(["error" => "❌ Respuesta inválida de Google Sheets.", "debug_raw" => $response]);
        exit();
    }

    echo json_encode($jsonData);
    exit();
}

// 📌 Generar informe en PDF
if (isset($_GET["remision"])) {
    $remision = $_GET["remision"];
    $articulo = $_GET["articulo"];
    $taller = $_GET["taller"];
    $fecha_despacho = $_GET["fecha_despacho"];
    $cantidad = $_GET["cantidad"];
    $usuario = $_GET["usuario"];
    $fecha = $_GET["fecha"];

    try {
        $dompdf = new Dompdf();
        $html = "
            <div style='text-align:center;'>
                <img src='URL_DEL_LOGO' width='100' alt='Logo'>
                <h1>📄 Informe de Pedido</h1>
                <hr>
                <p><strong>Número de Remisión:</strong> $remision</p>
                <p><strong>Artículo:</strong> $articulo</p>
                <p><strong>Taller:</strong> $taller</p>
                <p><strong>Fecha de Despacho:</strong> $fecha_despacho</p>
                <p><strong>Cantidad:</strong> $cantidad</p>
                <hr>
                <p><strong>Generado por:</strong> $usuario</p>
                <p><strong>Fecha del Informe:</strong> $fecha</p>
            </div>
        ";

        $dompdf->loadHtml($html);
        $dompdf->setPaper("A4", "portrait");
        $dompdf->render();
        $dompdf->stream("informe_pedido.pdf", ["Attachment" => true]);
    } catch (Exception $e) {
        echo json_encode(["error" => "❌ Error al generar el PDF: " . $e->getMessage()]);
    }
    exit();
}
?>
