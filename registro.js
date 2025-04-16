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
