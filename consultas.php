<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require "vendor/autoload.php";
use Dompdf\Dompdf;

$spreadsheetId = "1P1QQhPe8rrWMMzBe4xl4mnKgSqWxDf8VLlJVl2MrZHU";
$scriptUrl = "https://script.google.com/macros/s/AKfycbx8ML4x4bf2SjKNXYZj0xp84u6800fkBSURijAlJhpOHsNdj__W9PsfMRjXW8twLmqL/exec";

function obtenerDatos($filtro, $valor) {
    global $scriptUrl, $spreadsheetId;
    $url = "$scriptUrl?spreadsheetId=$spreadsheetId&hoja=articulos&filtro=$filtro&valor=$valor";

    // 📌 Usar cURL para obtener los datos
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

    $response = curl_exec($ch);
    curl_close($ch);

    return json_decode($response, true);
}

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultados de la Consulta</title>
    <link rel="stylesheet" href="consultas.css">
</head>
<body>

    <div class="container">
        <h1>📑 Resultado de la Consulta</h1>
        <div class="tabla-container">
            <table id="tablaResultados">
                <thead>
                    <tr>
                        <th>Remisión</th>
                        <th>Artículo</th>
                        <th>Taller</th>
                        <th>Fecha de Despacho</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    if (isset($_GET["filtro"]) && isset($_GET["valor"])) {
                        $filtro = $_GET["filtro"];
                        $valor = $_GET["valor"];
                        $datos = obtenerDatos($filtro, $valor);

                        if (!empty($datos)) {
                            foreach ($datos as $pedido) {
                                echo "<tr>
                                        <td>{$pedido['remision']}</td>
                                        <td>{$pedido['articulo']}</td>
                                        <td>{$pedido['taller']}</td>
                                        <td>{$pedido['fecha_despacho']}</td>
                                        <td>{$pedido['cantidad']}</td>
                                    </tr>";
                            }
                        } else {
                            echo "<tr><td colspan='5'>⚠️ No se encontraron resultados.</td></tr>";
                        }
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>

</body>
</html>
