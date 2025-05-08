<?php
require('fpdf186/fpdf.php');

// 📌 URL de Google Apps Script
$scriptUrl = "https://script.google.com/macros/s/AKfycbyzJHuKweTANZFCughYkDN3vheWicSBjCuGq3rJKb8I2bpHSmxD-lh12zsS3Gm6CA6N/exec";

// 📌 Recibir datos del formulario
$nombre = $_POST['nombreUsuario'] ?? "Desconocido";
$estado = $_POST['filtroEstado'] ?? "todos";
$filtroTipo = $_POST['tipoFiltro'] ?? "todos";
$valorFiltro = $_POST['valorFiltro'] ?? "";

// 📌 Construcción de la URL con los filtros
$scriptUrl .= "?estado=" . urlencode($estado);
if ($filtroTipo !== "todos" && !empty($valorFiltro)) {
    $scriptUrl .= "&" . urlencode($filtroTipo) . "=" . urlencode($valorFiltro);
}

// 🌐 Obtener datos desde Google Apps Script
$response = file_get_contents($scriptUrl);
$datos = json_decode($response, true);

// 🏢 Clase personalizada para el PDF
class PDF extends FPDF {
    function Header() {
        // 🏢 Logo desde URL externa
        $logoUrl = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2Fsuraguantescol%2F";
        $this->Image($logoUrl, 10, 10, 30, 30, 'PNG');

        // 📌 Datos de la empresa
        $this->SetFont('Arial', 'B', 14);
        $this->Cell(190, 10, 'Suramericana de Guantes SAS', 0, 1, 'C');
        $this->SetFont('Arial', '', 12);
        $this->Cell(190, 8, 'Palmira, Valle del Cauca', 0, 1, 'C');
        $this->Ln(10);
    }

    function Footer() {
        // 📌 Pie de página con numeración
        $this->SetY(-15);
        $this->SetFont('Arial', 'I', 10);
        $this->Cell(0, 10, 'Página ' . $this->PageNo(), 0, 0, 'C');
    }
}

// 📆 Fecha automática
$fecha = date("d/m/Y");

// 🏗 Crear el PDF
$pdf = new PDF();
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(190, 10, "Informe de Pedidos - " . $fecha, 0, 1, 'C');
$pdf->Ln(5);
$pdf->Cell(190, 10, "Generado por: " . $nombre, 0, 1, 'C');
$pdf->Ln(10);

// 📊 Tabla de pedidos
$pdf->SetFont('Arial', 'B', 10);
$pdf->Cell(60, 10, "Taller", 1, 0, 'C');
$pdf->Cell(60, 10, "Pendientes", 1, 0, 'C');
$pdf->Cell(70, 10, "Artículo", 1, 1, 'C');

$pdf->SetFont('Arial', '', 10);
if (!empty($datos)) {
    foreach ($datos as $fila) {
        $pdf->Cell(60, 10, $fila['taller'], 1, 0, 'C');
        $pdf->Cell(60, 10, $fila['pendiente'], 1, 0, 'C');
        $pdf->Cell(70, 10, $fila['articulo'], 1, 1, 'C');
    }
} else {
    $pdf->Cell(190, 10, "⚠️ No hay pedidos que cumplan con el filtro", 1, 1, 'C');
}

// 📥 Descargar el PDF
$pdf->Output('D', 'Informe_Pedidos.pdf');
?>
