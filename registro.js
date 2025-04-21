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

    // 📌 Función para obtener valores seguros del formulario
    const getValue = (id) => {
        const element = document.getElementById(id);
        return element ? element.value.trim() : "";
    };

    // 📌 Capturar el evento de envío del formulario
    const formulario = document.getElementById("pedidoForm");
    if (formulario) {
        formulario.addEventListener("submit", async (event) => {
            event.preventDefault(); // Evita la recarga del formulario

            console.log("📌 Botón presionado, preparando datos...");

            // Obtener valores del formulario
            const remision = getValue("remision");
            const articulo = getValue("articulo");
            const taller = getValue("taller");
            const fecha_despacho = getValue("fecha_despacho");
            const cantidad = getValue("cantidad");
            const referencia = getValue("referencia");

            if (!remision || !articulo || !taller || !fecha_despacho || !cantidad) {
                alert("❌ Todos los campos obligatorios deben estar llenos.");
                return;
            }

            // Obtener datos de entregas parciales
           document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("pedidoForm");

    if (formulario) {
        formulario.addEventListener("submit", async (event) => {
            event.preventDefault(); // Evita la recarga del formulario

            console.log("📌 Botón presionado, preparando datos...");

            // 📌 Obtener valores del formulario
            const getValue = (id) => document.getElementById(id)?.value.trim() || "";

            const remision = getValue("remision");
            const articulo = getValue("articulo");
            const taller = getValue("taller");
            const fecha_despacho = getValue("fecha_despacho");
            const cantidad = getValue("cantidad");
            const referencia = getValue("referencia");

            if (!remision || !articulo || !taller || !fecha_despacho || !cantidad) {
                alert("❌ Todos los campos obligatorios deben estar llenos.");
                return;
            }

            // 📌 Capturar entregas parciales
            let entregas_parciales = [];
            document.querySelectorAll(".entrega-parcial").forEach((div) => {
                const fecha_parcial = div.querySelector("input[type='date']").value.trim();
                const cantidad_parcial = div.querySelector("input[type='number']").value.trim();
                if (fecha_parcial && cantidad_parcial) {
                    entregas_parciales.push({ fecha: fecha_parcial, cantidad: cantidad_parcial });
                }
            });

            // 📌 Crear objeto con los datos del pedido
            const pedido = { remision, articulo, taller, fecha_despacho, cantidad, referencia, entregas_parciales };

            console.log("📌 Datos que se enviarán:", pedido);

            try {
                const response = await fetch("https://script.google.com/macros/s/AKfycbxxewslukjEuDUbVQ49j1l5Pg8lwsXiT2U5qqk9nkye4yrvP3-CtVC8Ff5pU375LkWA/exec", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(pedido),
                });

                if (!response.ok) {
                    throw new Error(`❌ Error HTTP: ${response.status}`);
                }

                const data = await response.json();
                alert(data.mensaje || "✅ Pedido guardado correctamente.");
                formulario.reset(); // 📌 Limpiar el formulario tras éxito
            } catch (error) {
                console.error("❌ Error en la conexión:", error);
                alert("❌ Hubo un error al registrar el pedido.");
            }
        });
    } else {
        console.error("❌ Error: No se encontró el formulario 'pedidoForm'");
    }
});
