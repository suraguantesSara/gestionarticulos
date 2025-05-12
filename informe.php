<?php
require('fpdf186/fpdf.php');

// Obtener parámetros de la URL
$filtro = $_GET['filtro'] ?? 'Sin filtro';
$valor = $_GET['valor'] ?? 'Sin valor especificado';
$usuario = $_GET['usuario'] ?? 'Desconocido';
$fecha_actual = date("d/m/Y H:i:s");

// URL del servicio para obtener los datos
$url = "https://script.google.com/macros/s/AKfycbyQR8dNXMxbbf1quOtHrJ7JF0MPBN9DVmp1vwswMnauX_BMEdyesje2atpB1oTrPs0/exec?filtro=" . urlencode($filtro) . "&valor=" . urlencode($valor);
$response = file_get_contents($url);

// Validar respuesta
if (!$response) {
    die("❌ Error: No se pudo obtener datos desde el servidor.");
}

// Asegurarse que la respuesta esté en UTF-8
$response = mb_convert_encoding($response, 'UTF-8', 'auto');
$data = json_decode($response, true);

// Verificar si los datos son válidos
if (!is_array($data) || empty($data)) {
    die("⚠ No hay registros disponibles para este filtro.");
}

// Clase personalizada para el PDF
class PDF extends FPDF {
    function Header() {
        $this->Image('logo.png', 15, 10, 40, 40, 'PNG');
        $this->SetFont('Arial', 'B', 16);
        $this->Cell(270, 10, utf8_decode('Suramericana de Guantes SAS'), 0, 1, 'C');
        $this->SetFont('Arial', 'I', 12);
        $this->Cell(270, 8, utf8_decode('Palmira, Valle del Cauca, Colombia'), 0, 1, 'C');
        $this->Ln(10);
    }

    function Footer() {
        $this->SetY(-15);
        $this->SetFont('Arial', 'I', 10);
        $this->Cell(0, 10, utf8_decode('Página ') . $this->PageNo(), 0, 0, 'C');
    }
}

// Crear PDF
$pdf = new PDF('L', 'mm', 'A4');
$pdf->SetMargins(15, 15, 15);
$pdf->AddPage();

// Título
$pdf->SetFont('Arial', 'B', 14);
$pdf->Cell(270, 10, utf8_decode("INFORME DE INVENTARIO"), 0, 1, 'C');
$pdf->SetFont('Arial', '', 12);
$pdf->Ln(5);
$pdf->MultiCell(270, 6, utf8_decode("Este informe refleja la gestión de inventario basada en la consulta realizada. Se presentan los registros actuales con el estado de los artículos y su disponibilidad en los talleres correspondientes."), 0, 'J');
$pdf->Ln(10);
$pdf->SetFont('Arial', 'I', 10);
$pdf->Cell(270, 6, utf8_decode("Fecha de generación: ") . $fecha_actual, 0, 1, 'C');
$pdf->Cell(270, 6, utf8_decode("Generado por: ") . utf8_decode($usuario), 0, 1, 'C');
$pdf->Ln(10);

// Encabezados
$pdf->SetFillColor(28, 117, 188);
$pdf->SetTextColor(255, 255, 255);
$pdf->SetFont('Arial', 'B', 10);
$pdf->Cell(80, 10, utf8_decode("B"), 1, 0, 'C', true);
$pdf->Cell(80, 10, utf8_decode("C"), 1, 0, 'C', true);
$pdf->Cell(110, 10, utf8_decode("N"), 1, 1, 'C', true);
$pdf->SetTextColor(0, 0, 0);
$pdf->SetFont('Arial', '', 10);

// Datos
foreach ($data as $row) {
    $columna_b = isset($row[1]) ? utf8_decode($row[1]) : 'N/A';
    $columna_c = isset($row[2]) ? utf8_decode($row[2]) : 'N/A';
    $columna_n = isset($row[13]) ? utf8_decode($row[13]) : 'N/A';

    $pdf->Cell(80, 10, $columna_b, 1, 0, 'Articulo');
    $pdf->Cell(80, 10, $columna_c, 1, 0, 'Taller');
    $pdf->Cell(110, 10, $columna_n, 1, 1, 'Pendiente');
}

$pdf->Ln(10);

// Pie de página
$pdf->SetFont('Arial', 'I', 12);
$pdf->MultiCell(270, 6, utf8_decode("Este informe ha sido generado automáticamente por el sistema de Suramericana de Guantes SAS. Para consultas adicionales, comuníquese con nuestro equipo de sop_

