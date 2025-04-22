let entregaContador = 0; // Contador para las entregas parciales
const maxEntregas = 5; // Límite de entregas parciales

function agregarEntregaParcial() {
    if (entregaContador < maxEntregas) {
        entregaContador++;

        let container = document.getElementById("entregasParciales");

        let div = document.createElement("div");
        div.classList.add("entrega-parcial");
        div.id = `entrega-${entregaContador}`;

        div.innerHTML = `
            <label for="fecha_parcial_${entregaContador}">Fecha Parcial ${entregaContador}:</label>
            <input type="date" id="fecha_parcial_${entregaContador}" required>

            <label for="cantidad_parcial_${entregaContador}">Cantidad Entregada:</label>
            <input type="number" id="cantidad_parcial_${entregaContador}" required>

            <button type="button" onclick="eliminarEntrega(${entregaContador})">❌ Eliminar</button>
        `;

        container.appendChild(div);
    } else {
        alert("Solo puedes agregar hasta 5 entregas parciales.");
    }
}

function eliminarEntrega(id) {
    let entrega = document.getElementById(`entrega-${id}`);
    if (entrega) {
        entrega.remove();
        entregaContador--;
    }
}

document.getElementById("miFormulario").addEventListener("submit", function(event) {
    event.preventDefault();

    let formData = new FormData(this);
    let entregasParciales = [];

    for (let i = 1; i <= maxEntregas; i++) {
        let fecha = document.getElementById(`fecha_parcial_${i}`)?.value || "";
        let cantidad = document.getElementById(`cantidad_parcial_${i}`)?.value || "";

        if (fecha || cantidad) { // Solo guardar si hay datos
            entregasParciales.push({ fecha, cantidad });
        }
    }

    // 📌 Convertimos los datos en JSON para enviarlos a `registro.php`
    let pedido = {};
    formData.forEach((value, key) => {
        pedido[key] = value;
    });
    pedido.entregas_parciales = entregasParciales;

    fetch("registro.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido)
    })
    .then(response => response.json())
    .then(data => console.log("✅ Respuesta:", data))
    .catch(error => console.error("❌ Error:", error));
});
