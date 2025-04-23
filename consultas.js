document.getElementById("generarPDF").addEventListener("click", function() {
    let seleccionados = [];
    document.querySelectorAll(".seleccionar:checked").forEach(input => {
        seleccionados.push(JSON.parse(input.getAttribute("data-pedido")));
    });

    if (seleccionados.length === 0) {
        alert("⚠️ Debes seleccionar al menos un registro para generar el informe.");
        return;
    }

    let doc = new jsPDF();
    doc.text("Informe de Pedidos", 10, 10);

    seleccionados.forEach((pedido, index) => {
        let y = 20 + (index * 10);
        doc.text(`Remisión: ${pedido.remision} - Artículo: ${pedido.articulo}`, 10, y);
    });

    doc.save("informe_pedidos.pdf");
});
