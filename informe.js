document.getElementById("consultaForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let filtro = document.getElementById("filtro").value;
    let valor = document.getElementById("valor").value;

    fetch(`https://script.google.com/macros/s/AKfycbyQR8dNXMxbbf1quOtHrJ7JF0MPBN9DVmp1vwswMnauX_BMEdyesje2atpB1oTrPs0/exec?filtro=${encodeURIComponent(filtro)}&valor=${encodeURIComponent(valor)}`)
        .then(response => response.json())
        .then(data => {
            let resultadoDiv = document.getElementById("resultado");
            resultadoDiv.innerHTML = "";

            if (data.error) {
                resultadoDiv.innerHTML = `<p style="color: red;">${data.error}</p>`;
            } else if (data.mensaje) {
                resultadoDiv.innerHTML = `<p style="color: orange;">${data.mensaje}</p>`;
            } else {
                let table = "<table border='1'><tr>";
                table += "<th>Editar</th><th>B</th><th>C</th><th>N</th>"; // Nombres de las columnas deseadas
                table += "</tr>";

                data.forEach(row => {
                    table += "<tr>";
                    table += `<td><button onclick="seleccionarRemision('${row[0]}')">✏️ Editar</button></td>`;

                    // Extraer solo las columnas específicas (b, c y n)
                    let columnasDeseadas = [row[1], row[2], row[13]]; // Índices de las columnas correctos

                    table += columnasDeseadas.map(value => `<td>${value}</td>`).join("");
                    table += "</tr>";
                });

                table += "</table>";
                resultadoDiv.innerHTML = table;
            }
        })
        .catch(error => console.error("Error en la consulta:", error));
});

// Función para seleccionar una remisión en el formulario de entregas
function seleccionarRemision(remision) {
    document.getElementById("remisionEntrega").value = remision;
}

document.getElementById("generarPDF").addEventListener("click", function() {
    let filtro = document.getElementById("filtro").value;
    let valor = document.getElementById("valor").value;
    let usuario = document.getElementById("usuario").value || "Desconocido"; // Si el usuario no está definido

    if (!filtro || !valor) {
        alert("❌ Debes seleccionar un filtro y valor antes de generar el PDF.");
        return;
    }

    let pdfURL = `informe.php?filtro=${encodeURIComponent(filtro)}&valor=${encodeURIComponent(valor)}&usuario=${encodeURIComponent(usuario)}`;
    console.log("Generando PDF con URL:", pdfURL);
    window.open(pdfURL, "_blank"); // Abre el PDF en otra pestaña
});
