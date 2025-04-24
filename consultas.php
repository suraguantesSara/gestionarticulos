<?php
require('fpdf186/fpdf.php');

// Datos del informe
$filtro = $_GET['filtro'];
$valor = $_GET['valor'];
$usuario = $_GET['usuario'];
$fecha_actual = date("Y-m-d H:i:s");

// Obtener datos desde Apps Script
$data = json_decode(file_get_contents("https://script.google.com/macros/s/AKfycbx91_RfojfKdstAFiYAqlesAST2M7M9iFkSvJ9NsNjkJcS-akxpX3YPdgrIjKY-H_SC/exec?filtro=".urlencode($filtro)."&valor=".urlencode($valor)), true);

// Crear PDF con orientación horizontal
$pdf = new FPDF('L'); // 'L' = Landscape (horizontal)
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 16);

// Membrete con el logo
$pdf->Image('https://0901.static.prezi.com/preview/v2/htkkf7ewxt5git4tcu6zv6x7tp6jc3sachvcdoaizecfr3dnitcq_3_0.png', 10, 10, 50);
$pdf->Cell(280, 10, "Suramericana de Guantes SAS", 0, 1, 'C');
$pdf->SetFont('Arial', '', 12);
$pdf->Cell(280, 6, "Informe de Inventario", 0, 1, 'C');
$pdf->Cell(280, 6, "Fecha: " . $fecha_actual, 0, 1, 'C');
$pdf->Cell(280, 6, "Generado por: " . $usuario, 0, 1, 'C');
$pdf->Ln(10);

// Encabezado con colores
$pdf->SetFillColor(28, 117, 188); // Azul del logo
$pdf->SetTextColor(255, 255, 255); // Texto blanco en el encabezado
$pdf->Cell(280, 10, "Detalles del Informe", 1, 1, 'C', true);
$pdf->SetTextColor(0, 0, 0); // Restaurar texto negro
$pdf->SetFont('Arial', '', 11);
$pdf->Ln(5);

// Mostrar datos en tabla
if (!empty($data) && !isset($data['mensaje'])) {
    $pdf->SetFillColor(245, 127, 23); // Naranja del logo
    $pdf->SetTextColor(0, 0, 0);

    foreach ($data as $row) {
        $pdf->Cell(280, 8, implode(" | ", $row), 1, 1, 'C', true);
    }
} else {
    $pdf->Cell(280, 10, "⚠ No se encontraron resultados", 1, 1, 'C');
}

// Pie de página con información de contacto
$pdf->Ln(10);
$pdf->SetFont('Arial', 'I', 10);
$pdf->Cell(280, 10, "Contacto: +57 310 123 4567 | Correo: info@suramericanaguantes.com", 0, 1, 'C');
$pdf->Cell(280, 10, "Dirección: Palmira, Valle del Cauca, Colombia", 0, 1, 'C');

$pdf->Output();
?>
