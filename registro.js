let entregaContador = 0; 
const maxEntregas = 5; 

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


document.getElementById("guardarPedido").addEventListener("click", async (event) => {
    event.preventDefault(); // Evita que el formulario se recargue

    // Obtener valores del formulario
    const remision = document.getElementById("remision").value;
    const articulo = document.getElementById("articulo").value;
    const taller = document.getElementById("taller").value;
    const fecha_despacho = document.getElementById("fecha_despacho").value;
    const cantidad = document.getElementById("cantidad").value;
    const referencia = document.getElementById("referencia").value;

    // Obtener datos de entregas parciales
    let entregas_parciales = [];
    document.querySelectorAll(".entrega-parcial").forEach((div) => {
        const fecha_parcial = div.querySelector("input[type='date']").value;
        const cantidad_parcial = div.querySelector("input[type='number']").value;
        if (fecha_parcial && cantidad_parcial) {
            entregas_parciales.push({ fecha: fecha_parcial, cantidad: cantidad_parcial });
        }
    });

    // Crear objeto con los datos
    const pedido = { remision, articulo, taller, fecha_despacho, cantidad, referencia, entregas_parciales };

    console.log("📌 Datos que se enviarán:", pedido); // Para depuración

    try {
        // Enviar datos al backend `index.js`
        const response = await fetch("https://gestionarticulos-a8xs.onrender.com/registro.html", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pedido),
        });

        const data = await response.json();
        alert(data.mensaje); // Mostrar mensaje de éxito/error
    } catch (error) {
        console.error("❌ Error en la conexión:", error);
        alert("❌ Hubo un error al registrar el pedido.");
    }

    fetch("https://gestionarticulos-a8xs.onrender.com/registrar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        remision: "TEST123",
        articulo: "Ejemplo",
        taller: "Taller 1",
        fecha_despacho: "2025-04-16",
        cantidad: 10,
        referencia: "ABC123"
    })
})
.then(res => res.json())
.then(data => console.log("📌 Respuesta del servidor:", data))
.catch(error => console.error("❌ Error en la conexión:", error));
    
});
