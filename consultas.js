document.getElementById("consultaForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let filtro = document.getElementById("filtro").value;
    let valor = document.getElementById("valor").value;

    fetch(`https://script.google.com/macros/s/TU-SCRIPT-ID/exec?filtro=${filtro}&valor=${valor}`)
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
                    table += "<tr>" + Object.values(row).map(value => `<td>${value}</td>`).join("") + "</tr>";
                });

                table += "</table>";
                resultadoDiv.innerHTML = table;
            }
        })
        .catch(error => console.error("Error en la consulta:", error));
});
