document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("pedidoForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const pedido = {
            remision: document.getElementById("remision").value.trim(),
            articulo: document.getElementById("articulo").value.trim(),
            taller: document.getElementById("taller").value.trim(),
            fecha_despacho: document.getElementById("fecha_despacho").value.trim(),
            cantidad: document.getElementById("cantidad_despachar").value.trim(),
            referencia: document.getElementById("referencia").value.trim(),
        };

        console.log("📌 Enviando pedido:", pedido); // Verificar datos antes de enviarlos

        try {
            const response = await fetch("https://script.google.com/macros/s/TU_URL_DE_APPS_SCRIPT/exec", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pedido),
            });

            if (!response.ok) {
                throw new Error(`❌ Error HTTP: ${response.status}`);
            }

            alert("✅ Pedido registrado exitosamente.");
            document.getElementById("pedidoForm").reset();
        } catch (error) {
            alert("❌ Hubo un error al registrar el pedido.");
            console.error("❌ Error en la solicitud:", error);
        }
    });
});
