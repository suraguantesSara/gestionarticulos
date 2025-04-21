<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $remision = $_POST["remision"];
    $articulo = $_POST["articulo"];
    $taller = $_POST["taller"];
    $fecha_despacho = $_POST["fecha_despacho"];
    $cantidad = $_POST["cantidad"];
    $referencia = isset($_POST["referencia"]) ? $_POST["referencia"] : "Sin referencia";

    // 📌 Capturar entregas parciales
    $entregas_parciales = [];
    for ($i = 1; $i <= 5; $i++) {
        if (!empty($_POST["fecha_parcial_$i"]) && !empty($_POST["cantidad_parcial_$i"])) {
            $entregas_parciales[] = [
                "fecha" => $_POST["fecha_parcial_$i"],
                "cantidad" => $_POST["cantidad_parcial_$i"]
            ];
        }
    }

    $data = [
        "remision" => $remision,
        "articulo" => $articulo,
        "taller" => $taller,
        "fecha_despacho" => $fecha_despacho,
        "cantidad" => $cantidad,
        "referencia" => $referencia,
        "entregas_parciales" => $entregas_parciales
    ];

    $url = "https://script.google.com/macros/s/TU_URL_DE_APPS_SCRIPT/exec";
    $options = [
        "http" => [
            "header" => "Content-Type: application/json\r\n",
            "method" => "POST",
            "content" => json_encode($data),
        ],
    ];
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);

    if ($result === FALSE) {
        echo "<script>alert('❌ Error al registrar el pedido. Inténtalo de nuevo.');</script>";
    } else {
        echo "<script>
                alert('✅ Pedido registrado exitosamente.');
                window.location.href = 'index.html'; // Redirigir a formulario vacío
              </script>";
    }
}
?>
