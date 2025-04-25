<?php
require('fpdf186/fpdf.php');

// Datos del informe
$filtro = $_GET['filtro'] ?? '';
$valor = $_GET['valor'] ?? '';
$usuario = $_GET['usuario'] ?? '';
$fecha_actual = date("Y-m-d H:i:s");

// Obtener datos desde Apps Script (URL corregida)
$url = "https://script.google.com/macros/s/AKfycbxn4cbZ1HbkqsINmi8C9DokTvzy6R_67JgOV70WTBIJ497t6GtztlvkzKDDI1Ji27wG/exec?filtro=".urlencode($filtro)."&valor=".urlencode($valor);
$data = json_decode(file_get_contents($url), true);

// Crear PDF en modo horizontal
$pdf = new FPDF('L', 'mm', 'A4');
$pdf->SetMargins(10, 10, 10);
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 14);

// Membrete con logo y título centrado
$pdf->Image('https://0901.static.prezi.com/preview/v2/htkkf7ewxt5git4tcu6zv6x7tp6jc3sachvcdoaizecfr3dnitcq_3_0.png', 10, 10, 50);
$pdf->Cell(270, 10, "Suramericana de Guantes SAS", 0, 1, 'C');
$pdf->SetFont('Arial', '', 12);
$pdf->Cell(270, 6, "Informe de Inventario", 0, 1, 'C');
$pdf->Cell(270, 6, "Fecha: " . $fecha_actual, 0, 1, 'C');
$pdf->Cell(270, 6, "Generado por: " . $usuario, 0, 1, 'C');
$pdf->Ln(10);

// Encabezado de la tabla
$pdf->SetFillColor(28, 117, 188);
$pdf->SetTextColor(255, 255, 255);
$pdf->Cell(270, 10, "Detalles del Informe", 1, 1, 'C', true);
$pdf->SetTextColor(0, 0, 0);
$pdf->SetFont('Arial', '', 11);
$pdf->Ln(5);

// Validación de datos obtenidos
if (!$data || isset($data['error'])) {
    $pdf->Cell(270, 10, "❌ Error al obtener datos del servidor.", 1, 1, 'C');
} elseif (isset($data['mensaje'])) {
    $pdf->Cell(270, 10, "⚠ " . $data['mensaje'], 1, 1, 'C');
} else {
    // Si hay datos, construir la tabla
    foreach ($data as $row) {
        $texto = implode(" | ", array_map('htmlspecialchars', $row));
        $pdf->MultiCell(270, 8, $texto, 1, 'L', true);
    }
}

// Pie de página
$pdf->Ln(10);
$pdf->SetFont('Arial', 'I', 10);
$pdf->Cell(270, 10, "Contacto: +57 310 123 4567 | Correo: info@suramericanaguantes.com", 0, 1, 'C');
$pdf->Cell(270, 10, "Dirección: Palmira, Valle del Cauca, Colombia", 0, 1, 'C');

$pdf->Output();
?>
