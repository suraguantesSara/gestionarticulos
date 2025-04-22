<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

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

    // 📌 Agregar entregas parciales si existen
    for ($i = 1; $i <= 5; $i++) {
        if (!empty($_POST["fecha_parcial_$i"]) && !empty($_POST["cantidad_parcial_$i"])) {
            $pedido["entregas_parciales"][] = [
                "fecha" => $_POST["fecha_parcial_$i"],
                "cantidad" => $_POST["cantidad_parcial_$i"]
            ];
        }
    }

    // 📌 Enviar datos a Google Apps Script
    $googleSheetsUrl = "https://script.google.com/macros/s/AKfycbxjgM26a_h5B3myezn7el5OrFQ5MG3VybT8qQr4eS97RVs8O6A-S3VY8VySoE25jkYC/exec";
    
    $options = [
        "http" => [
            "method" => "POST",
            "header" => "Content-Type: application/json",
            "content" => json_encode($pedido)
        ]
    ];

    $context = stream_context_create($options);
    $response = file_get_contents($googleSheetsUrl, false, $context);

    if ($response) {
        echo json_encode(["mensaje" => "✅ Pedido registrado exitosamente.", "respuesta" => $response]);
    } else {
        echo json_encode(["mensaje" => "❌ Error al registrar el pedido en Google Sheets."]);
    }
} else {
    echo json_encode(["mensaje" => "❌ Solo se aceptan solicitudes POST."]);
}
?>
