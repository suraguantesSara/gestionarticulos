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


//envio de datos a dormulario (funcion guardar datos)

document.addEventListener("DOMContentLoaded", () => {
    const botonGuardar = document.getElementById("guardarPedido");

    if (botonGuardar) {
        botonGuardar.addEventListener("click", async (event) => {
            event.preventDefault(); // Evita que el formulario se recargue

            console.log("📌 Botón presionado, preparando datos...");

            // Obtener valores del formulario
            const remision = document.getElementById("remision")?.value.trim() || "";
            const articulo = document.getElementById("articulo")?.value.trim() || "";
            const taller = document.getElementById("taller")?.value.trim() || "";
            const fecha_despacho = document.getElementById("fecha_despacho")?.value.trim() || "";
            const cantidad = document.getElementById("cantidad")?.value.trim() || "";
            const referencia = document.getElementById("referencia")?.value.trim() || "";

            // Verificar si algún campo está vacío
            if (!remision || !articulo || !taller || !fecha_despacho || !cantidad || !referencia) {
                console.error("❌ Error: Faltan campos obligatorios.");
                alert("❌ Todos los campos son obligatorios. Verifica que estén correctamente llenos.");
                return;
            }

            // Obtener datos de entregas parciales
            let entregas_parciales = [];
            document.querySelectorAll(".entrega-parcial").forEach((div) => {
                const fecha_parcial = div.querySelector("input[type='date']").value.trim();
                const cantidad_parcial = div.querySelector("input[type='number']").value.trim();
                if (fecha_parcial && cantidad_parcial) {
                    entregas_parciales.push({ fecha: fecha_parcial, cantidad: cantidad_parcial });
                }
            });

            // Crear objeto con los datos
            const pedido = { remision, articulo, taller, fecha_despacho, cantidad, referencia, entregas_parciales };

            console.log("📌 Datos que se enviarán:", pedido); // Para depuración

            try {
                const response = await fetch("https://script.google.com/macros/s/AKfycbwzrSazpxO6cc0zXn2wLyKMaFX_frrUaA3WisM416FxLAWwM-WYcEPGKwV2AFNWMZc2xw/exec", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(pedido),
                });

                const data = await response.json();
                alert(data.mensaje || "✅ Pedido guardado correctamente.");
            } catch (error) {
                console.error("❌ Error en la conexión:", error);
                alert("❌ Hubo un error al registrar el pedido.");
            }
        });
    } else {
        console.error("❌ Error: No se encontró el botón 'guardarPedido'");
    }
});
