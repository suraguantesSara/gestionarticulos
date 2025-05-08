document.addEventListener("DOMContentLoaded", function () {
    const urlAPI = "https://script.google.com/macros/s/AKfycbyzJHuKweTANZFCughYkDN3vheWicSBjCuGq3rJKb8I2bpHSmxD-lh12zsS3Gm6CA6N/exec";
    const nombreUsuario = document.getElementById("nombreUsuario");
    const filtroEstado = document.getElementById("filtroEstado");
    const tipoFiltro = document.getElementById("tipoFiltro");
    const valorFiltro = document.getElementById("valorFiltro");
    const tablaResultados = document.getElementById("tablaResultados");
    const resultadoInforme = document.getElementById("resultadoInforme");
    const btnPDF = document.getElementById("btnPDF");

    // 🔄 Mostrar campo de búsqueda si el usuario elige "Taller" o "Artículo"
    tipoFiltro.addEventListener("change", function () {
        valorFiltro.style.display = (tipoFiltro.value !== "todos") ? "block" : "none";
        valorFiltro.value = "";
    });

    // 📊 Función para generar informe y mostrar los resultados
    function generarInforme() {
        const nombre = nombreUsuario.value.trim();
        const estadoSeleccionado = filtroEstado.value;
        const filtroSeleccionado = tipoFiltro.value;
        const filtroValor = valorFiltro.value.trim();

        // 🔎 Validaciones antes de hacer la consulta
        if (nombre === "") {
            alert("⚠️ Debes ingresar tu nombre antes de generar el informe.");
            return;
        }

        // 🛠 Construcción de la URL con filtros
        let urlConFiltros = `${urlAPI}?estado=${estadoSeleccionado}`;
        if (filtroSeleccionado !== "todos" && filtroValor !== "") {
            urlConFiltros += `&${filtroSeleccionado}=${encodeURIComponent(filtroValor)}`;
        }

        // 🔄 Obtener datos desde Apps Script
        fetch(urlConFiltros)
            .then(response => response.json())
            .then(data => {
                tablaResultados.innerHTML = ""; // 🗑 Limpiar tabla antes de mostrar nuevos datos

                if (data.length === 0) {
                    tablaResultados.innerHTML = "<tr><td colspan='3'>⚠️ No se encontraron resultados.</td></tr>";
                    btnPDF.style.display = "none"; // ❌ Ocultar botón PDF si no hay datos
                    return;
                }

                // 📌 Agregar los datos filtrados a la tabla
                data.forEach(row => {
                    let fila = `<tr>
                        <td>${row.taller}</td>
                        <td>${row.pendiente}</td>
                        <td>${row.articulo}</td>
                    </tr>`;
                    tablaResultados.innerHTML += fila;
                });

                resultadoInforme.style.display = "block"; // 📊 Mostrar tabla de resultados
                btnPDF.style.display = "block"; // ✅ Activar botón PDF después de ver los datos
            })
            .catch(error => {
                console.error("❌ Error al obtener datos:", error);
                alert("❌ Hubo un problema al generar el informe. Inténtalo nuevamente.");
                btnPDF.style.display = "none"; // ❌ Ocultar botón PDF en caso de error
            });
    }

    // 📄 Función para generar el PDF con `informe.php`
    function generarPDF() {
        const nombre = nombreUsuario.value.trim();
        const estadoSeleccionado = filtroEstado.value;
        const filtroSeleccionado = tipoFiltro.value;
        const filtroValor = valorFiltro.value.trim();

        fetch("informe.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombreUsuario: nombre,
                filtroEstado: estadoSeleccionado,
                tipoFiltro: filtroSeleccionado,
                valorFiltro: filtroValor
            })
        })
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "Informe_Pedidos.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();
        })
        .catch(error => {
            console.error("❌ Error al generar PDF:", error);
            alert("❌ No se pudo generar el PDF. Inténtalo nuevamente.");
        });
    }

    // 🏷️ Asignar las funciones a los botones
    window.generarInforme = generarInforme;
    window.generarPDF = generarPDF;
});
