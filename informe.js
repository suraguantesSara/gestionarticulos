document.getElementById("consultaForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let filtro = document.getElementById("filtro").value;
    let valor = document.getElementById("valor").value;

    fetch(`https://https://script.google.com/macros/s/AKfycbz_nzfXaFX3IFcoXGvVMTZtVQN2Eof5Q6am-vu38DdnGPm6GxhXRTf72jIBKgaV7nTm/exec?filtro=${encodeURIComponent(filtro)}&valor=${encodeURIComponent(valor)}`)
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
