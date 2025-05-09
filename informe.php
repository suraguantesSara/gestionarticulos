<?php
require('fpdf186/fpdf.php');

// 📌 Datos del informe
$filtro = $_GET['filtro'] ?? 'Sin filtro';
$valor = $_GET['valor'] ?? 'Sin valor especificado';
$usuario = $_GET['usuario'] ?? 'Desconocido';
$fecha_actual = date("d/m/Y H:i:s");

// 🌐 Obtener datos desde Google Apps Script
$url = "https://script.google.com/macros/s/AKfycbyQR8dNXMxbbf1quOtHrJ7JF0MPBN9DVmp1vwswMnauX_BMEdyesje2atpB1oTrPs0/exec?filtro=".urlencode($filtro)."&valor=".urlencode($valor);
$response = file_get_contents($url);
$data = json_decode($response, true);

// 📌 Verificar si la respuesta es válida
if (!$response || !is_array($data)) {
    die("❌ Error: No se pudo obtener datos desde el servidor.");
}

// 📄 Clase personalizada para el PDF
class PDF extends FPDF {
    function Header() {
        // 🏢 Logo desde archivo local
        $this->Image('logo.png', 10, 10, 40, 40, 'PNG');

        // 📌 Título del informe
        $this->SetFont('Arial', 'B', 16);
        $this->Cell(270, 10, 'Suramericana de Guantes SAS', 0, 1, 'C');
        $this->SetFont('Arial', 'I', 12);
        $this->Cell(270, 8, 'Palmira, Valle del Cauca, Colombia', 0, 1, 'C');
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
$pdf->SetMargins(15, 15, 15);
$pdf->AddPage();

// 📜 Introducción al informe
$pdf->SetFont('Arial', 'B', 14);
$pdf->Cell(270, 10, "INFORME DE INVENTARIO", 0, 1, 'C');
$pdf->SetFont('Arial', '', 12);
$pdf->Ln(5);
$pdf->MultiCell(270, 6, "A continuación, se presenta el informe generado con base en los registros consultados en el sistema. Este documento refleja el estado actual de los artículos en inventario y su disponibilidad en los talleres correspondientes.", 0, 'J');
$pdf->Ln(10);
$pdf->SetFont('Arial', 'I', 10);
$pdf->Cell(270, 6, "Fecha de generación: " . $fecha_actual, 0, 1, 'C');
$pdf->Cell(270, 6, "Generado por: " . $usuario, 0, 1, 'C');
$pdf->Ln(10);

// 📊 Encabezado de la tabla
$pdf->SetFillColor(28, 117, 188);
$pdf->SetTextColor(255, 255, 255);
$pdf->SetFont('Arial', 'B', 10);
$pdf->Cell(80, 10, "Taller", 1, 0, 'C', true);
$pdf->Cell(80, 10, "Pendientes", 1, 0, 'C', true);
$pdf->Cell(110, 10, "Artículo", 1, 1, 'C', true);
$pdf->SetTextColor(0, 0, 0);
$pdf->SetFont('Arial', '', 10);

// 📌 Validación de datos obtenidos
if (empty($data)) {
    $pdf->Cell(270, 10, "⚠ No se encontraron registros.", 1, 1, 'C');
} else {
    foreach ($data as $row) {
        if (!is_array($row)) {
            continue; // Saltar si la fila no es un array
        }

        $pdf->Cell(80, 10, $row['taller'] ?? 'N/A', 1, 0, 'C');
        $pdf->Cell(80, 10, $row['pendiente'] ?? 'N/A', 1, 0, 'C');
        $pdf->Cell(110, 10, $row['articulo'] ?? 'N/A', 1, 1, 'C');
    }
}

// 📜 Cierre del informe con agradecimiento
$pdf->Ln(10);
$pdf->SetFont('Arial', 'I', 12);
$pdf->MultiCell(270, 6, "Este informe ha sido generado automáticamente por el sistema de Suramericana de Guantes SAS. Para consultas adicionales, comuníquese con nuestro equipo de soporte.", 0, 'J');
$pdf->Ln(10);

// 🔚 Información de contacto
$pdf->SetFont('Arial', 'I', 10);
$pdf->Cell(270, 6, "📞 Contacto: +57 310 123 4567", 0, 1, 'C');
$pdf->Cell(270, 6, "📧 Correo: info@suramericanaguantes.com", 0, 1, 'C');
$pdf->Cell(270, 6, "📍 Dirección: Palmira, Valle del Cauca, Colombia", 0, 1, 'C');

// 📥 Generar y descargar el PDF
$pdf->Output('D', 'Informe_Inventario.pdf');
?>
