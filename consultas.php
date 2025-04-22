<?php
require "vendor/autoload.php";
use Dompdf\Dompdf;

$spreadsheetId = "TU_GOOGLE_SHEETS_ID";
$scriptUrl = "https://script.google.com/macros/s/AKfycbxdYrOLJ67Oj8vxblYF-bZQ2aPRumOn3K6K4xD-fZYya1lYADMyK3c3jHqvNU1ilqTW/exec";

// 📌 Si se está realizando una consulta de pedidos
if (isset($_GET["filtro"]) && isset($_GET["valor"])) {
    $filtro = $_GET["filtro"];
    $valor = $_GET["valor"];

    $url = "$scriptUrl?spreadsheetId=$spreadsheetId&hoja=articulos&filtro=$filtro&valor=$valor";
    $response = file_get_contents($url);

    header("Content-Type: application/json");
    echo $response;
    exit();
}

// 📌 Si se está generando el informe en PDF
if (isset($_GET["remision"])) {
    $remision = $_GET["remision"];
    $articulo = $_GET["articulo"];
    $taller = $_GET["taller"];
    $fecha_despacho = $_GET["fecha_despacho"];
    $cantidad = $_GET["cantidad"];
    $usuario = $_GET["usuario"];
    $fecha = $_GET["fecha"];

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
    exit();
}
?>
