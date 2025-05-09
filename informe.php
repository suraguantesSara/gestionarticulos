<?php
require('fpdf186/fpdf.php');

// 📌 Datos del informe
$filtro = $_GET['filtro'] ?? '';
$valor = $_GET['valor'] ?? '';
$usuario = $_GET['usuario'] ?? 'Desconocido';
$fecha_actual = date("d/m/Y H:i:s");

// 🌐 Obtener datos desde Google Apps Script
$url = "https://script.google.com/macros/s/AKfycbyQR8dNXMxbbf1quOtHrJ7JF0MPBN9DVmp1vwswMnauX_BMEdyesje2atpB1oTrPs0/exec?filtro=".urlencode($filtro)."&valor=".urlencode($valor);
$response = file_get_contents($url);
$data = json_decode($response, true);

// 📄 Clase personalizada para el PDF
class PDF extends FPDF {
    function Header() {
        // 🏢 Logo (carga desde archivo en el mismo directorio)
        $this->Image('logo.png', 10, 10, 40, 40, 'PNG');

        // 📌 Título del informe
        $this->SetFont('Arial', 'B', 16);
        $this->Cell(270, 10, 'Suramericana de Guantes SAS', 0, 1, 'C');
        $this->SetFont('Arial', '', 12);
        $this->Cell(270, 6, 'Palmira, Valle del Cauca, Colombia', 0, 1, 'C');
        $this->Ln(10);
    }

    function Footer() {
        // 📌 Pie de página con número de página
        $this->SetY(-15);
        $this->SetFont('Arial', 'I', 10);
        $this->Cell(0, 10, 'Página ' . $this->PageNo(), 0, 0, 'C');
    }
}

// 🏗 Crear el PDF en modo horizontal
$pdf = new PDF('L', 'mm', 'A4');
$pdf->SetMargins(10, 10, 10);
$pdf->AddPage();

// 📝 Encabezado del informe
$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(270, 10, "Informe de Inventario", 0, 1, 'C');
$pdf->SetFont('Arial', '', 10);
$pdf->Cell(270, 6, "Fecha: " . $fecha_actual, 0, 1, 'C');
$pdf->Cell(270, 6, "Generado por: " . $usuario, 0, 1, 'C');
$pdf->Ln(10);

// 📊 Encabezado de la tabla
$pdf->SetFillColor(28, 117, 188);
$pdf->SetTextColor(255, 255, 255);
$pdf->SetFont('Arial', 'B', 10);
$pdf->Cell(60, 10, "Taller", 1, 0, 'C', true);
$pdf->Cell(60, 10, "Pendientes", 1, 0, 'C', true);
$pdf->Cell(150, 10, "Artículo", 1, 1, 'C', true);
$pdf->SetTextColor(0, 0, 0);
$pdf->SetFont('Arial', '', 10);

// 📌 Validación de datos obtenidos
if (!$data || isset($data['error'])) {
    $pdf->Cell(270, 10, "❌ Error al obtener datos del servidor.", 1, 1, 'C');
} elseif (isset($data['mensaje'])) {
    $pdf->Cell(270, 10, "⚠ " . $data['mensaje'], 1, 1, 'C');
} else {
    // 🏗 Construcción de la tabla con datos reales
    foreach ($data as $row) {
        $pdf->Cell(60, 10, $row['taller'], 1, 0, 'C');
        $pdf->Cell(60, 10, $row['pendiente'], 1, 0, 'C');
        $pdf->Cell(150, 10, $row['articulo'], 1, 1, 'C');
    }
}

// 🔚 Pie de página con información de contacto
$pdf->Ln(10);
$pdf->SetFont('Arial', 'I', 10);
$pdf->Cell(270, 10, "Contacto: +57 310 123 4567 | Correo: info@suramericanaguantes.com", 0, 1, 'C');
$pdf->Cell(270, 10, "Dirección: Palmira, Valle del Cauca, Colombia", 0, 1, 'C');

// 📥 Generar y descargar el PDF
$pdf->Output('D', 'Informe_Pedidos.pdf');
?>
