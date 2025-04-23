<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$scriptUrl = "https://script.google.com/macros/s/AKfycbzN7JIs1aWLS6BY2YbOFpdiL4rXK1qHBi7ZSO9T4rZzqmvZ68q4Vq-FYezU0EvUjteO/exec";

function obtenerDatos() {
    global $scriptUrl;
    $url = "$scriptUrl";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

    $response = curl_exec($ch);
    curl_close($ch);

    return json_decode($response, true);
}

$datos = obtenerDatos();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consultar Pedidos</title>
    <link rel="stylesheet" href="consultas.css">
</head>
<body>

    <div class="container">
        <h1>📊 Consulta de Pedidos</h1>

        <table id="tablaResultados">
            <thead>
                <tr>
                    <th>Seleccionar</th>
                    <th>Remisión</th>
                    <th>Artículo</th>
                    <th>Taller</th>
                    <th>Fecha de Despacho</th>
                    <th>Cantidad</th>
                </tr>
            </thead>
            <tbody>
                <?php
                if (!empty($datos)) {
                    foreach ($datos as $pedido) {
                        echo "<tr>
                                <td><input type='checkbox' class='seleccionar' data-pedido='".json_encode($pedido)."'></td>
                                <td>{$pedido['remision']}</td>
                                <td>{$pedido['articulo']}</td>
                                <td>{$pedido['taller']}</td>
                                <td>{$pedido['fecha_despacho']}</td>
                                <td>{$pedido['cantidad']}</td>
                            </tr>";
                    }
                } else {
                    echo "<tr><td colspan='6'>⚠️ No se encontraron resultados.</td></tr>";
                }
                ?>
            </tbody>
        </table>

        <button id="generarPDF">📥 Generar Informe PDF</button>
    </div>

    <script src="consultas.js"></script>
</body>
</html>
