document.addEventListener("DOMContentLoaded", function() {
    const datosPedidos = [
        { remision: "001", articulo: "Camisas", taller: "Yolanda", fecha: "2025-04-10", cantidad: 50 },
        { remision: "002", articulo: "Gorros", taller: "Fernando", fecha: "2025-04-11", cantidad: 30 },
        { remision: "003", articulo: "Bordados", taller: "Erika", fecha: "2025-04-12", cantidad: 20 }
    ]; // 📌 Esto es un ejemplo, luego se conectará con Google Sheets

    document.getElementById("consultaForm").addEventListener("submit", function(event) {
        event.preventDefault();
        buscarPedidos();
    });
});

function buscarPedidos() {
    const filtro = document.getElementById("filtro").value;
    const valorFiltro = document.getElementById("valorFiltro").value.toLowerCase();
    const tablaResultados = document.querySelector("#tablaResultados tbody");

    tablaResultados.innerHTML = ""; // Limpiar resultados previos

    const resultados = datosPedidos.filter(pedido => {
        return pedido[filtro].toLowerCase().includes(valorFiltro);
    });

    resultados.forEach(pedido => {
        let fila = `<tr>
                      <td>${pedido.remision}</td>
                      <td>${pedido.articulo}</td>
                      <td>${pedido.taller}</td>
                      <td>${pedido.fecha}</td>
                      <td>${pedido.cantidad}</td>
                  </tr>`;
        tablaResultados.innerHTML += fila;
    });

    if (resultados.length === 0) {
        tablaResultados.innerHTML = `<tr><td colspan="5">No se encontraron resultados.</td></tr>`;
    }
}

function descargarInforme() {
    let nombreGenerador = document.getElementById("nombreGenerador").value.trim();
    let fechaInforme = document.getElementById("fechaInforme").value;
    if (nombreGenerador === "" || fechaInforme === "") {
        alert("Por favor, ingresa el nombre del generador y la fecha del informe.");
        return;
    }

    let contenidoCSV = "Nombre del Generador,Fecha del Informe\n";
    contenidoCSV += `${nombreGenerador},${fechaInforme}\n\n`;
    contenidoCSV += "Remisión,Artículo,Taller,Fecha de Despacho,Cantidad\n";

    document.querySelectorAll("#tablaResultados tbody tr").forEach(fila => {
        let columnas = fila.querySelectorAll("td");
        if (columnas.length > 1) {
            contenidoCSV += `${columnas[0].innerText},${columnas[1].innerText},${columnas[2].innerText},${columnas[3].innerText},${columnas[4].innerText}\n`;
        }
    });

    let blob = new Blob([contenidoCSV], { type: "text/csv" });
    let enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = `Informe_${fechaInforme}.csv`;
    enlace.click();
}
