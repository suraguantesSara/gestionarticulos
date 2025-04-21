document.addEventListener("DOMContentLoaded", () => {
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

    const getValue = (id) => document.getElementById(id)?.value.trim() || "";

    document.getElementById("pedidoForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const pedido = {
            remision: getValue("remision"),
            articulo: getValue("articulo"),
            taller: getValue("taller"),
            fecha_despacho: getValue("fecha_despacho"),
            cantidad: getValue("cantidad_despachar"),
            referencia: getValue("referencia"),
            entregas_parciales: []
        };

        document.querySelectorAll(".entrega-parcial").forEach((div, index) => {
            pedido.entregas_parciales.push({
                fecha: getValue(`fecha_parcial_${index + 1}`),
                cantidad: getValue(`cantidad_parcial_${index + 1}`)
            });
        });

        try {
            const response = await fetch("https://script.google.com/macros/s/AKfycbyQqqydA8Hqo0O-Cy9zluRtHih-th_HZej_7i9jEgayW0x3G80pcdF9HA6OaQxlTHXf/exec", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pedido),
            });

            if (!response.ok) {
                throw new Error(`❌ Error HTTP: ${response.status}`);
            }

            alert("✅ Pedido registrado exitosamente.");
            document.getElementById("pedidoForm").reset();
            document.getElementById("entregasParciales").innerHTML = "";
            entregaContador = 0;
        } catch (error) {
            alert("❌ Hubo un error al registrar el pedido.");
        }
    });
});
