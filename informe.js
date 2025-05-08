document.addEventListener("DOMContentLoaded", function () {
    const urlAPI = "https://script.google.com/macros/s/AKfycbyzJHuKweTANZFCughYkDN3vheWicSBjCuGq3rJKb8I2bpHSmxD-lh12zsS3Gm6CA6N/exec";
    const btnPDF = document.getElementById("btnPDF");

    function generarInforme() {
        const nombre = document.getElementById("nombreUsuario").value;
        const estado = document.getElementById("filtroEstado").value;
        const tipo = document.getElementById("tipoFiltro").value;
        const valor = document.getElementById("valorFiltro").value;

        let url = `${urlAPI}?estado=${estado}`;
        if (tipo !== "todos" && valor) url += `&${tipo}=${encodeURIComponent(valor)}`;

        fetch(url).then(res => res.json()).then(data => {
            document.getElementById("tablaResultados").innerHTML = data.length ? data.map(row => `<tr><td>${row.taller}</td><td>${row.pendiente}</td><td>${row.articulo}</td></tr>`).join("") : "<tr><td colspan='3'>No hay resultados.</td></tr>";
            document.getElementById("resultadoInforme").style.display = "block";
            btnPDF.style.display = data.length ? "block" : "none";
        });
    }

    function generarPDF() {
        fetch("informe.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
        }).then(res => res.blob()).then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "Informe_Pedidos.pdf";
            a.click();
        });
    }

    window.generarInforme = generarInforme;
    window.generarPDF = generarPDF;
});
