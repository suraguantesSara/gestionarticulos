document.addEventListener("DOMContentLoaded", function () {
    const tablaResultados = document.querySelector("#tablaResultados tbody");
    const buscarBtn = document.getElementById("buscarBtn");

    function buscarPedidos() {
        const filtro = document.getElementById("filtro").value;
        const valorFiltro = document.getElementById("valorFiltro").value.trim();

        if (valorFiltro === "") {
            alert("⚠️ Ingresa un valor de búsqueda.");
            return;
        }

        console.log(`🔍 Buscando pedidos con filtro: ${filtro}, valor: ${valorFiltro}...`);
        fetch(`consultas.php?filtro=${filtro}&valor=${valorFiltro}`)
            .then(response => response.json())
            .then(data => {
                console.log("✅ Respuesta recibida:", data);
                if (!data || data.length === 0) {
                    alert("⚠️ No se encontraron resultados.");
                    return;
                }
                mostrarResultados(data);
            })
            .catch(error => {
                console.error("❌ Error en la consulta:", error);
                alert("❌ Hubo un problema al obtener los datos.");
            });
    }

    function mostrarResultados(datos) {
        tablaResultados.innerHTML = "";
        datos.forEach(pedido => {
            let fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${pedido.remision}</td>
                <td>${pedido.articulo}</td>
                <td>${pedido.taller}</td>
                <td>${pedido.fecha_despacho}</td>
                <td>${pedido.cantidad}</td>
            `;
            tablaResultados.appendChild(fila);
        });

        console.log(`✅ ${datos.length} resultados cargados en la tabla.`);
        alert("✅ Los datos se han cargado correctamente.");
    }

    buscarBtn.addEventListener("click", buscarPedidos);
});
