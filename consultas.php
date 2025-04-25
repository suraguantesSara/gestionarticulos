<?php
require('fpdf186/fpdf.php');

// Datos del informe
$filtro = isset($_GET['filtro']) ? $_GET['filtro'] : "";
$valor = isset($_GET['valor']) ? $_GET['valor'] : "";
$usuario = isset($_GET['usuario']) ? $_GET['usuario'] : "Anónimo";
$fecha_actual = date("Y-m-d H:i:s");

// Obtener datos desde Apps Script (con nueva URL)
$data = json_decode(file_get_contents("https://script.google.com/macros/s/AKfycbwI6nMGi6Fsc6cHgWLGr2g8t-baHrTFCpk_xOiPv3xTptaZBkSJgCsuyolqoXeyBoTK/exec?filtro=".urlencode($filtro)."&valor=".urlencode($valor)), true);

// Crear PDF en modo horizontal y ajustar márgenes
$pdf = new FPDF('L', 'mm', 'A4');
$pdf->SetMargins(10, 10, 10);
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 14);

// Membrete con el logo
$pdf->Image('https://0901.static.prezi.com/preview/v2/htkkf7ewxt5git4tcu6zv6x7tp6jc3sachvcdoaizecfr3dnitcq_3_0.png', 10, 10, 50);
$pdf->Cell(270, 10, "Suramericana de Guantes SAS", 0, 1, 'C');
$pdf->SetFont('Arial', '', 12);
$pdf->Cell(270, 6, "Informe de Inventario", 0, 1, 'C');
$pdf->Cell(270, 6, "Fecha: " . $fecha_actual, 0, 1, 'C');
$pdf->Cell(270, 6, "Generado por: " . $usuario, 0, 1, 'C');
$pdf->Ln(10);

// Encabezado con colores
$pdf->SetFillColor(28, 117, 188);
$pdf->SetTextColor(255, 255, 255);
$pdf->Cell(270, 10, "Detalles del Informe", 1, 1, 'C', true);
$pdf->SetTextColor(0, 0, 0);
$pdf->SetFont('Arial', '', 11);
$pdf->Ln(5);

// Validación y manejo de resultados
if (!empty($data) && !isset($data['mensaje'])) {
    $pdf->SetFillColor(245, 127, 23);
    foreach ($data as $row) {
        $texto = implode(" | ", array_map('htmlspecialchars', $row));
        $pdf->MultiCell(270, 8, $texto, 1, 'L', true);
    }
} else {
    $pdf->Cell(270, 10, "⚠ No se encontraron resultados", 1, 1, 'C');
}

// Pie de página con información de contacto
$pdf->Ln(10);
$pdf->SetFont('Arial', 'I', 10);
$pdf->Cell(270, 10, "Contacto: +57 310 123 4567 | Correo: info@suramericanaguantes.com", 0, 1, 'C');
$pdf->Cell(270, 10, "Dirección: Palmira, Valle del Cauca, Colombia", 0, 1, 'C');

$pdf->Output();
?>
