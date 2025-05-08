document.addEventListener("DOMContentLoaded", function () {
    const urlAPI = "https://script.google.com/macros/s/AKfycbyzJHuKweTANZFCughYkDN3vheWicSBjCuGq3rJKb8I2bpHSmxD-lh12zsS3Gm6CA6N/exec";
    const nombreUsuario = document.getElementById("nombreUsuario");
    const filtroEstado = document.getElementById("filtroEstado");
    const tipoFiltro = document.getElementById("tipoFiltro");
    const valorFiltro = document.getElementById("valorFiltro");
    const tablaResultados = document.getElementById("tablaResultados");
    const resultadoInforme = document.getElementById("resultadoInforme");

    // 🔄 Mostrar campo de búsqueda si el usuario elige "Taller" o "Artículo"
    tipoFiltro.addEventListener("change", function () {
        valorFiltro.style.display = (tipoFiltro.value !== "todos") ? "block" : "none";
        valorFiltro.value = "";
    });

    // 📊 Función para generar informe
    function generarInforme() {
        const nombre = nombreUsuario.value.trim();
        const estadoSeleccionado = filtroEstado.value;
        const filtroSeleccionado = tipoFiltro.value;
        const filtroValor = valorFiltro.value.trim();

        // 🔎 Validar que el usuario ingresó su nombre
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
                    return;
                }

                // 📌 Recorrer los datos y agregarlos a la tabla
                data.forEach(row => {
                    let fila = `<tr>
                        <td>${row.taller}</td>
                        <td>${row.pendiente}</td>
                        <td>${row.articulo}</td>
                    </tr>`;
                    tablaResultados.innerHTML += fila;
                });

                resultadoInforme.style.display = "block"; // 📊 Mostrar tabla de resultados

                // 📄 Enviar los datos filtrados al PHP para generar el PDF
                generarPDF(nombre, estadoSeleccionado, filtroSeleccionado, filtroValor, data);
            })
            .catch(error => {
                console.error("❌ Error al obtener datos:", error);
                alert("❌ Hubo un problema al generar el informe. Inténtalo nuevamente.");
            });
    }

    // 📄 Función para enviar datos al PHP y generar el PDF
    function generarPDF(nombre, estado, tipoFiltro, valorFiltro, datos) {
        fetch("generar_pdf.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombreUsuario: nombre,
                filtroEstado: estado,
                tipoFiltro: tipoFiltro,
                valorFiltro: valorFiltro,
                datos: datos
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

    // 🏷️ Asignar la función al botón
    window.generarInforme = generarInforme;
});
           
