<?php
require "vendor/autoload.php";
use Dompdf\Dompdf;

$remision = $_GET["remision"];
$articulo = $_GET["articulo"];
$taller = $_GET["taller"];
$fecha_despacho = $_GET["fecha_despacho"];
$cantidad = $_GET["cantidad"];
$usuario = $_GET["usuario"];
$fecha = $_GET["fecha"];

$dompdf = new Dompdf();
$html = "
    <h1 style='text-align:center;'>📄 Informe de Pedido</h1>
    <p><strong>Número de Remisión:</strong> $remision</p>
    <p><strong>Artículo:</strong> $articulo</p>
    <p><strong>Taller:</strong> $taller</p>
    <p><strong>Fecha de Despacho:</strong> $fecha_despacho</p>
    <p><strong>Cantidad:</strong> $cantidad</p>
    <hr>
    <p><strong>Generado por:</strong> $usuario</p>
    <p><strong>Fecha del Informe:</strong> $fecha</p>
";

$dompdf->loadHtml($html);
$dompdf->setPaper("A4", "portrait");
$dompdf->render();
$dompdf->stream("informe_pedido.pdf", ["Attachment" => true]);
?>
