document.getElementById("consultaForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let filtro = document.getElementById("filtro").value;
    let valor = document.getElementById("valor").value;

    fetch(`https://script.google.com/macros/s/AKfycbyQR8dNXMxbbf1quOtHrJ7JF0MPBN9DVmp1vwswMnauX_BMEdyesje2atpB1oTrPs0/exec?filtro=${encodeURIComponent(filtro)}&valor=${encodeURIComponent(valor)}`)
        .then(response => response.json())
        .then(data => {
            let resultadoDiv = document.getElementById("resultado");
            resultadoDiv.innerHTML = "";

            if (!Array.isArray(data)) {
                resultadoDiv.innerHTML = `<p style="color: red;">❌ Error: Respuesta no válida del servidor.</p>`;
                console.error("Error en la consulta:", data);
                return;
            }

            if (data.length === 0) {
                resultadoDiv.innerHTML = `<p style="color: orange;">⚠ No se encontraron resultados.</p>`;
                return;
            }

            let table = "<table border='1'><tr>";
            table += "<th>B</th><th>C</th><th>N</th>"; // Columnas específicas
            table += "</tr>";

            data.forEach(row => {
                table += "<tr>";

                // Extraer solo las columnas específicas (2, 3 y 14)
                let columnasDeseadas = [row[1], row[2], row[13]];

                table += columnasDeseadas.map(value => `<td>${value}</td>`).join("");
                table += "</tr>";
            });

            table += "</table>";
            resultadoDiv.innerHTML = table;
        })
        .catch(error => {
            console.error("Error en la consulta:", error);
            document.getElementById("resultado").innerHTML = `<p style="color: red;">❌ Error al obtener datos.</p>`;
        });
});

// 🖨 Generar PDF con datos correctos
document.getElementById("btnPDF").addEventListener("click", function() {
    let filtro = document.getElementById("filtro").value;
    let valor = document.getElementById("valor").value;
    let usuario = document.getElementById("usuario").value || "Desconocido";

    if (!filtro || !valor) {
        alert("❌ Debes seleccionar un filtro y valor antes de generar el PDF.");
        return;
    }

    let pdfURL = `informe.php?filtro=${encodeURIComponent(filtro)}&valor=${encodeURIComponent(valor)}&usuario=${encodeURIComponent(usuario)}`;
    console.log("Generando PDF con URL:", pdfURL);
    window.open(pdfURL, "_blank"); // Abre el PDF en otra pestaña
});

// ⬅ Volver al index.html
document.getElementById("btnVolver").addEventListener("click", function() {
    window.location.href = "index.html"; // Redirige a la página de inicio
});
