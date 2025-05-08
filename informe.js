function generarInforme() {
    const nombre = nombreUsuario.value.trim();
    const estadoSeleccionado = filtroEstado.value;
    const filtroSeleccionado = tipoFiltro.value;
    const filtroValor = valorFiltro.value.trim();

    if (nombre === "") {
        alert("⚠️ Debes ingresar tu nombre antes de generar el informe.");
        return;
    }

    // 🛠 Construcción de la URL asegurando que siempre enviamos parámetros
    let urlConFiltros = `${urlAPI}?estado=${encodeURIComponent(estadoSeleccionado)}&nombre=${encodeURIComponent(nombre)}`;

    if (filtroSeleccionado !== "todos" && filtroValor !== "") {
        urlConFiltros += `&${encodeURIComponent(filtroSeleccionado)}=${encodeURIComponent(filtroValor)}`;
    }

    fetch(urlConFiltros)
        .then(response => response.json())
        .then(data => {
            console.log("🔎 Datos recibidos:", data); // 📌 Ver lo que devuelve Apps Script en la consola
            if (!data || data.length === 0) {
                tablaResultados.innerHTML = "<tr><td colspan='3'>⚠️ No hay resultados.</td></tr>";
                btnPDF.style.display = "none";
                return;
            }

            tablaResultados.innerHTML = data.map(row => `<tr><td>${row.taller}</td><td>${row.pendiente}</td><td>${row.articulo}</td></tr>`).join("");
            resultadoInforme.style.display = "block";
            btnPDF.style.display = "block";
        })
        .catch(error => {
            console.error("❌ Error en la consulta:", error);
            alert("❌ Hubo un problema al generar el informe.");
        });
}
