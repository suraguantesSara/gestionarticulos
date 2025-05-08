document.addEventListener("DOMContentLoaded", function () {
    const urlAPI = "https://script.google.com/macros/s/AKfycbyzJHuKweTANZFCughYkDN3vheWicSBjCuGq3rJKb8I2bpHSmxD-lh12zsS3Gm6CA6N/exec";
    const nombreUsuario = document.getElementById("nombreUsuario");
    const filtroEstado = document.getElementById("filtroEstado");
    const tipoFiltro = document.getElementById("tipoFiltro");
    const valorFiltro = document.getElementById("valorFiltro");
    const tablaResultados = document.getElementById("tablaResultados");
    const resultadoInforme = document.getElementById("resultadoInforme");
    const btnPDF = document.getElementById("btnPDF");

    tipoFiltro.addEventListener("change", function () {
        valorFiltro.style.display = (tipoFiltro.value !== "todos") ? "block" : "none";
    });

    function generarInforme() {
        let urlConFiltros = `${urlAPI}?estado=${filtroEstado.value}`;
        if (tipoFiltro.value !== "todos" && valorFiltro.value.trim() !== "") {
            urlConFiltros += `&${tipoFiltro.value}=${encodeURIComponent(valorFiltro.value.trim())}`;
        }

        fetch(urlConFiltros).then(response => response.json()).then(data => {
            tablaResultados.innerHTML = data.length ? data.map(row => `<tr><td>${row.taller}</td><td>${row.pendiente}</td><td>${row.articulo}</td></tr>`).join("") : "<tr><td colspan='3'>No hay resultados.</td></tr>";
            resultadoInforme.style.display = "block";
            btnPDF.style.display = data.length ? "block" : "none";
        });
    }

    function generarPDF() {
        fetch("informe.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombreUsuario: nombreUsuario.value, filtroEstado: filtroEstado.value, tipoFiltro: tipoFiltro.value, valorFiltro: valorFiltro.value })
        }).then(response => response.blob()).then(blob => {
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
