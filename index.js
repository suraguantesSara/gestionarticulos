const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;
const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbwQoJRJwlV1KhnTipbungmKUHvLmvtNxxwJa0IgxwwjYNt7q0ZJabwtzH62QOn0ilDP/exec";

app.use(cors());
app.use(express.json());

// 📌 Servir archivos estáticos desde la raíz del proyecto
app.use(express.static(__dirname));

// 📌 Ruta raíz que carga "index.html"
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// 📌 Ruta para acceder a "registros.html"
app.get("/registros", (req, res) => {
    res.sendFile(path.join(__dirname, "registros.html"));
});

// 📌 Ruta para recibir datos del frontend y enviarlos a Google Sheets
app.post("/registrar", async (req, res) => {
    try {
        console.log("📌 Datos recibidos en el backend:", req.body); // Para depuración

        // Enviar datos a Google Sheets
        const response = await axios.post(GOOGLE_SHEETS_URL, req.body);

        // Responder con los datos procesados
        res.json(response.data);
    } catch (error) {
        console.error("❌ Error al enviar datos a Google Sheets:", error);
        res.status(500).json({ mensaje: "❌ Error al registrar el pedido", error: error.toString() });
    }
});

// 📌 Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
