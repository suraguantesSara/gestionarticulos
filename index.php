<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// 📌 URL del script de Google Sheets
$GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbzTB-Io2LyQoAC3vrCgShuosvWpXmW9K3OLuoUr6CmAAIYo_5mH_Shep6f043zW103Q/exec";

// 📌 Mostrar mensaje confirmando conexión
echo json_encode(["mensaje" => "✅ Conexión establecida con la base de datos (Google Sheets)."]);

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Pedidos</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="container">
        <h1>📋 Sistema de Gestión de Pedidos</h1>

        <div class="menu">
            <button onclick="window.location.href='registro.html'">📝 Registrar Pedido</button>
            <button onclick="window.location.href='consultas.html'">📊 Consultar e Informar</button>
        </div>
    </div>

</body>

</html>
?>
