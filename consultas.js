document.getElementById("consultaForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let filtro = document.getElementById("filtro").value;
    let valor = document.getElementById("valor").value;

    fetch(`https://script.google.com/macros/s/AKfycbxn4cbZ1HbkqsINmi8C9DokTvzy6R_67JgOV70WTBIJ497t6GtztlvkzKDDI1Ji27wG/exec?filtro=${encodeURIComponent(filtro)}&valor=${encodeURIComponent(valor)}`)
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
                table += Object.keys(data[0]).map(key => `<th>${key}</th>`).join("");
                table += "</tr>";

                data.forEach(row => {
                    table += "<tr>";
                    table += `<td><button onclick="seleccionarRemision('${row[0]}')">✏️ Editar</button></td>`;
                    table += Object.values(row).map(value => `<td>${value}</td>`).join("");
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

// Envío del formulario de entrega parcial
document.getElementById("entregaForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let remision = document.getElementById("remisionEntrega").value;
    let entrega1 = document.getElementById("entrega1").value;
    let cantidad1 = document.getElementById("cantidad1").value;
    let entrega2 = document.getElementById("entrega2").value;
    let cantidad2 = document.getElementById("cantidad2").value;
    let entrega3 = document.getElementById("entrega3").value;
    let cantidad3 = document.getElementById("cantidad3").value;

    if (!remision) {
        alert("❌ Debes seleccionar una remisión antes de registrar la entrega parcial.");
        return;
    }

    fetch("https://script.google.com/macros/s/AKfycbxn4cbZ1HbkqsINmi8C9DokTvzy6R_67JgOV70WTBIJ497t6GtztlvkzKDDI1Ji27wG/exec", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            remision: remision,
            entregaParcial1: entrega1,
            cantidadParcial1: cantidad1,
            entregaParcial2: entrega2,
            cantidadParcial2: cantidad2,
            entregaParcial3: entrega3,
            cantidadParcial3: cantidad3
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensaje) {
            alert("✅ " + data.mensaje);
        } else {
            alert("❌ " + data.error);
        }
    })
    .catch(error => console.error("Error en el envío:", error));
});
