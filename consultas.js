const scriptUrl = "https://script.google.com/macros/s/AKfycbwI6nMGi6Fsc6cHgWLGr2g8t-baHrTFCpk_xOiPv3xTptaZBkSJgCsuyolqoXeyBoTK/exec";

document.getElementById("consultaForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let filtro = document.getElementById("filtro").value.trim();
    let valor = document.getElementById("valor").value.trim();

    fetch(`${scriptUrl}?filtro=${encodeURIComponent(filtro)}&valor=${encodeURIComponent(valor)}`)
        .then(response => response.json())
        .then(data => {
            let resultadoDiv = document.getElementById("resultado");
            resultadoDiv.innerHTML = "";

            if (data.error) {
                resultadoDiv.innerHTML = `<p style="color: red;">${data.error}</p>`;
            } else if (data.mensaje) {
                resultadoDiv.innerHTML = `<p style="color: orange;">${data.mensaje}</p>`;
            } else {
                let table = "<table border='1'><tr><th>Seleccionar</th>";
                table += Object.keys(data[0]).map(key => `<th>${key}</th>`).join("");
                table += "</tr>";

                data.forEach(row => {
                    table += "<tr>";
                    table += `<td><input type="radio" name="seleccion" value="${row.remision}" data-articulo="${row.articulo}" data-taller="${row.taller}"></td>`;
                    table += Object.values(row).map(value => `<td>${value}</td>`).join("");
                    table += "</tr>";
                });

                table += "</table>";
                resultadoDiv.innerHTML = table;
            }
        })
        .catch(error => console.error("Error en la consulta:", error));
});

// Agregar entrega parcial
document.getElementById("entregaForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let seleccion = document.querySelector('input[name="seleccion"]:checked');
    if (!seleccion) {
        alert("⚠️ Selecciona un registro antes de agregar una entrega parcial.");
        return;
    }

    let remision = seleccion.value;
    let entrega = document.getElementById("entrega").value;
    let cantidad = document.getElementById("cantidad").value;

    if (!entrega || cantidad <= 0) {
        alert("⚠️ Ingresa una fecha válida y una cantidad mayor a 0.");
        return;
    }

    fetch(scriptUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ remision, entrega, cantidad })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(`❌ Error: ${data.error}`);
        } else {
            alert("✅ Entrega parcial guardada correctamente.");
            document.getElementById("entregaForm").reset();
        }
    })
    .catch(error => console.error("Error al enviar entrega parcial:", error));
});

// Generar PDF desde PHP
document.getElementById("generarPDF").addEventListener("click", function() {
    let filtro = document.getElementById("filtro").value.trim();
    let valor = document.getElementById("valor").value.trim();
    let usuario = document.getElementById("usuario").value.trim();

    if (!usuario) {
        alert("⚠️ Ingresa tu nombre antes de generar el informe.");
        return;
    }

    window.location.href = `consultas.php?filtro=${encodeURIComponent(filtro)}&valor=${encodeURIComponent(valor)}&usuario=${encodeURIComponent(usuario)}`;
});
