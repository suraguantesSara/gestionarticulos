<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $pedido = [
        "remision" => $_POST["remision"] ?? "",
        "articulo" => $_POST["articulo"] ?? "",
        "taller" => $_POST["taller"] ?? "",
        "fecha_despacho" => $_POST["fecha_despacho"] ?? "",
        "cantidad" => $_POST["cantidad_despachar"] ?? "",
        "referencia" => $_POST["referencia"] ?? "",
        "entregas_parciales" => []
    ];

    // 📌 Capturar entregas parciales con su cantidad correspondiente
    for ($i = 1; $i <= 5; $i++) {
        $fecha = $_POST["fecha_parcial_$i"] ?? "";
        $cantidad = $_POST["cantidad_parcial_$i"] ?? "";

        if (!empty($fecha) || !empty($cantidad)) {
            $pedido["entregas_parciales"][] = ["fecha" => $fecha, "cantidad" => $cantidad];
        }
    }

    // 📌 Guardar log para revisar estructura antes de enviarlo
    file_put_contents("log.txt", json_encode($pedido, JSON_PRETTY_PRINT));

    // 📌 Enviar datos a Google Apps Script
    $googleSheetsUrl = "https://script.google.com/macros/s/AKfycbxqjUGskpamza1-kGCBW2XSGJRuQI3XSjCIKH40vnc0108v9vf6CWZCsezUO_fGQuHu/exec";

    $ch = curl_init($googleSheetsUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($pedido));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);

    $response = curl_exec($ch);
    curl_close($ch);

    // 📌 Mostrar mensaje de éxito con opciones
    echo "<div style='text-align:center; font-family:Arial; padding:20px;'>
            <h2 style='color:green;'>✅ Pedido registrado exitosamente.</h2>
            <p>Tu pedido ha sido guardado correctamente.</p>
            <button onclick='window.location.href=\"registro.html\"' 
                style='background:#007bff; color:white; padding:10px; border:none; border-radius:5px; cursor:pointer;'>
                🔄 Realizar otro registro
            </button>
            <button onclick='window.location.href=\"index.html\"' 
                style='background:#28a745; color:white; padding:10px; border:none; border-radius:5px; cursor:pointer; margin-left:10px;'>
                🏠 Volver al inicio
            </button>
          </div>";
    exit();
}
?>

