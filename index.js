const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;
const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbzTB-Io2LyQoAC3vrCgShuosvWpXmW9K3OLuoUr6CmAAIYo_5mH_Shep6f043zW103Q/exec";

app.use(cors());
app.use(express.json());

// 📌 Servir archivos estáticos desde la carpeta pública
app.use(express.static(path.join(__dirname, "public")));

// 📌 Ruta raíz que carga "index.html"
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 📌 Ruta para acceder a "registros.html"
app.get("/registros", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "registros.html"));
});

// 📌 Ruta para recibir datos del frontend y enviarlos a Google Sheets
app.post("/registrar", async (req, res) => {
    try {
        console.log("📌 Datos recibidos en el backend:", req.body);

        // 📌 Validar que haya datos en el cuerpo de la solicitud
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ mensaje: "❌ Error: No se enviaron datos válidos." });
        }

        // 📌 Enviar datos a Google Sheets
        const response = await axios.post(GOOGLE_SHEETS_URL, req.body, {
            headers: { "Content-Type": "application/json" }
        });

        // 📌 Revisar si la respuesta de Google Sheets es válida
        if (response.status !== 200) {
            throw new Error(`❌ Error HTTP ${response.status}: ${response.statusText}`);
        }

        // 📌 Responder con los datos procesados
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
