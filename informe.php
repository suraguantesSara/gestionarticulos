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

// Verificar si la respuesta es válida
if (!$response) {
    die("❌ Error: No se pudo obtener datos desde el servidor.");
}

$data = json_decode($response, true);

// Verificar si los datos son válidos
if (!is_array($data) || empty($data)) {
    die("⚠ No hay registros disponibles para este filtro.");
}

// Clase para el PDF
class PDF extends FPDF {
    function Header() {
        $this->Image('logo.png', 15, 10, 40, 40, 'PNG'); // 🏢 Logo de la empresa
        $this->SetFont('Arial', 'B', 16);
        $this->Cell(270, 10, 'Suramericana de Guantes SAS', 0, 1, 'C');
        $this->SetFont('Arial', 'I', 12);
        $this->Cell(270, 8, 'Palmira, Valle del Cauca, Colombia', 0, 1, 'C');
        $this->Ln(10);
    }

    function Footer() {
        $this->SetY(-15);
        $this->SetFont('Arial', 'I', 10);
        $this->Cell(0, 10, 'Página ' . $this->PageNo(), 0, 0, 'C');
    }
}

// Crear una nueva instancia de PDF
$pdf = new PDF('L', 'mm', 'A4');
$pdf->SetMargins(15, 15, 15);
$pdf->AddPage();

// Título del informe
$pdf->SetFont('Arial', 'B', 14);
$pdf->Cell(270, 10, "INFORME DE INVENTARIO", 0, 1, 'C');
$pdf->SetFont('Arial', '', 12);
$pdf->Ln(5);
$pdf->MultiCell(270, 6, "Este informe refleja la gestión de inventario basada en la consulta realizada. Se presentan los registros actuales con el estado de los artículos y su disponibilidad en los talleres correspondientes.", 0, 'J');
$pdf->Ln(10);
$pdf->SetFont('Arial', 'I', 10);
$pdf->Cell(270, 6, "Fecha de generación: " . $fecha_actual, 0, 1, 'C');
$pdf->Cell(270, 6, "Generado por: " . $usuario, 0, 1, 'C');
$pdf->Ln(10);

// Encabezados de la tabla
$pdf->SetFillColor(28, 117, 188);
$pdf->SetTextColor(255, 255, 255);
$pdf->SetFont('Arial', 'B', 10);
$pdf->Cell(80, 10, "Taller", 1, 0, 'C', true);
$pdf->Cell(80, 10, "Pendientes", 1, 0, 'C', true);
$pdf->Cell(110, 10, "Artículo", 1, 1, 'C', true);
$pdf->SetTextColor(0, 0, 0);
$pdf->SetFont('Arial', '', 10);

// Recorrer los datos y generar las filas de la tabla
foreach ($data as $row) {
    // Verificar que los campos existen antes de acceder a ellos
    $taller = isset($row['Taller']) ? $row['Taller'] : 'N/A';
    $faltante = isset($row['Faltante a la fecha']) ? $row['Faltante a la fecha'] : 'N/A';
    $articulo = isset($row['Articulo']) ? $row['Articulo'] : 'N/A';

    // Imprimir cada fila
    $pdf->Cell(80, 10, $taller, 1, 0, 'C');
    $pdf->Cell(80, 10, $faltante, 1, 0, 'C');
    $pdf->Cell(110, 10, $articulo, 1, 1, 'C');
}

// Espaciado antes del pie de página
$pdf->Ln(10);

// Texto adicional al pie del informe
$pdf->SetFont('Arial', 'I', 12);
$pdf->MultiCell(270, 6, "Este informe ha sido generado automáticamente por el sistema de Suramericana de Guantes SAS. Para consultas adicionales, comuníquese con nuestro equipo de soporte.", 0, 'J');
$pdf->Ln(10);

// Información de contacto
$pdf->SetFont('Arial', 'I', 10);
$pdf->Cell(270, 6, "📞 Contacto: +57 310 123 4567", 0, 1, 'C');
$pdf->Cell(270, 6, "📧 Correo: info@suramericanaguantes.com", 0, 1, 'C');
$pdf->Cell(270, 6, "📍 Dirección: Palmira, Valle del Cauca, Colombia", 0, 1, 'C');

// Generar el PDF
$pdf->Output('D', 'Informe_Inventario.pdf');
?>
