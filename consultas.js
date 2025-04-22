document.addEventListener("DOMContentLoaded", function () {
    const tablaResultados = document.querySelector("#tablaResultados tbody");
    const nombreGenerador = document.getElementById("nombreGenerador");
    const fechaInforme = document.getElementById("fechaInforme");
    const buscarBtn = document.getElementById("buscarBtn");
    const descargarBtn = document.getElementById("descargarBtn");

    function buscarPedidos() {
        const filtro = document.getElementById("filtro").value;
        const valorFiltro = document.getElementById("valorFiltro").value.trim();
        
        if (valorFiltro === "") {
            alert("⚠️ Ingresa un valor de búsqueda.");
            return;
        }

        fetch(`consultas.php?filtro=${filtro}&valor=${valorFiltro}`)
            .then(response => response.json())
            .then(data => mostrarResultados(data))
            .catch(error => console.error("❌ Error en la consulta:", error));
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
            fila.addEventListener("click", () => seleccionarPedido(pedido));
            tablaResultados.appendChild(fila);

            fila.style.cursor = "pointer";
            fila.style.transition = "background 0.3s ease-in-out";
            fila.addEventListener("mouseover", () => fila.style.background = "#f1f1f1");
            fila.addEventListener("mouseout", () => fila.style.background = "transparent");
        });
    }

    function seleccionarPedido(pedido) {
        sessionStorage.setItem("pedidoSeleccionado", JSON.stringify(pedido));
        alert("✅ Pedido seleccionado. Ahora puedes generar el informe.");
    }

    function descargarInforme() {
        let pedido = JSON.parse(sessionStorage.getItem("pedidoSeleccionado"));

        if (!pedido || nombreGenerador.value.trim() === "" || fechaInforme.value.trim() === "") {
            alert("⚠️ Debes seleccionar un pedido e ingresar tu nombre y fecha.");
            return;
        }

        window.location.href = `consultas.php?remision=${pedido.remision}&articulo=${pedido.articulo}&taller=${pedido.taller}&fecha_despacho=${pedido.fecha_despacho}&cantidad=${pedido.cantidad}&usuario=${nombreGenerador.value}&fecha=${fechaInforme.value}`;
    }

    buscarBtn.addEventListener("click", buscarPedidos);
    descargarBtn.addEventListener("click", descargarInforme);
});
