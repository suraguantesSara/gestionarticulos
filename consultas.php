<?php
require('fpdf.php');

$filtro = $_GET['filtro'];
$valor = $_GET['valor'];
$data = json_decode(file_get_contents("https://script.google.com/macros/s/AKfycbx0KD_5RFIsKWlnb5u8jYki0v2EYruS_gCnf0gdxX0mqX6Rzm3bJIkyfoG0PNnq6d7C/exec?filtro=".urlencode($filtro)."&valor=".urlencode($valor)), true);

$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 16);
$pdf->Cell(40, 10, "Informe de Consulta");

$pdf->SetFont('Arial', '', 12);
foreach ($data as $row) {
    $pdf->Ln();
    $pdf->Cell(40, 10, implode(", ", $row));
}

$pdf->Output();
?>
