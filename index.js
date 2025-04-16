const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycby0jsj-E9qiugtLFf8BKX74YLh24_IBHNPX2930a_DlYhJs9b7zYonyAcG4US7PLbdwBQ/exec";

app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la raíz del proyecto
app.use(express.static(__dirname));

// Ruta raíz que carga "index.html"
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Ruta para redirigir a "registros.html"
app.get("/registros", (req, res) => {
    res.sendFile(path.join(__dirname, "registros.html"));
});

// Ruta para recibir datos del frontend y enviarlos a Google Sheets
app.post("/registrar", async (req, res) => {
    try {
        console.log("📌 Datos recibidos en el backend:", req.body); // Para depuración

        const response = await axios.post(GOOGLE_SHEETS_URL, req.body);
        res.json(response.data);
    } catch (error) {
        console.error("❌ Error al enviar datos a Google Sheets:", error);
        res.status(500).json({ mensaje: "❌ Error al registrar el pedido", error: error.toString() });
    }
});
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
