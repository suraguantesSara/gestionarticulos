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

    // 📌 Agregar entregas parciales en pares (fecha y cantidad)
    for ($i = 1; $i <= 5; $i++) {
        $fecha = $_POST["fecha_parcial_$i"] ?? "";
        $cantidad = $_POST["cantidad_parcial_$i"] ?? "";

        if (!empty($fecha) || !empty($cantidad)) {
            $pedido["entregas_parciales"][] = ["fecha" => $fecha, "cantidad" => $cantidad];
        }
    }

    // 📌 Guardamos el log para revisar estructura antes de enviarlo
    file_put_contents("log.txt", json_encode($pedido, JSON_PRETTY_PRINT));

    // 📌 Enviar datos a Google Sheets
   $googleSheetsUrl = "https://script.google.com/macros/s/AKfycbxQXJ2XXmTlWsug3E6gSfcZ092DJ8L63oikw8AIQI9XVNgXDF2U1gFYqhsu9M3vD9hw/exec";

    $ch = curl_init($googleSheetsUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($pedido));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);

    $response = curl_exec($ch);
    curl_close($ch);

    echo json_encode(["mensaje" => "✅ Pedido registrado exitosamente.", "respuesta" => $response]);
}
