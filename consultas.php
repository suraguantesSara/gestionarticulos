<?php
require('fpdf.php');

$filtro = $_GET['filtro'];
$valor = $_GET['valor'];
$usuario = $_GET['usuario'];
$fecha_actual = date("Y-m-d H:i:s");

$data = json_decode(file_get_contents("https://script.google.com/macros/s/AKfycbx91_RfojfKdstAFiYAqlesAST2M7M9iFkSvJ9NsNjkJcS-akxpX3YPdgrIjKY-H_SC/exec?filtro=".urlencode($filtro)."&valor=".urlencode($valor)), true);

$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 16);
$pdf->Cell(40, 10, "Informe de Consulta");
$pdf->Ln();

$pdf->SetFont('Arial', '', 12);
$pdf->Cell(40, 10, "Fecha: " . $fecha_actual);
$pdf->Ln();
$pdf->Cell(40, 10, "Generado por: " . $usuario);
$pdf->Ln();
$pdf->Ln();

foreach ($data as $row) {
    $pdf->Cell(40, 10, implode(", ", $row));
    $pdf->Ln();
}

$pdf->Output();
?>
