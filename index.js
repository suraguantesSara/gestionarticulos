const express = require('express');
const cors = require('cors');
const { google } = require('googleapis'); // Conexión con Google Sheets

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Permitir recibir JSON desde el frontend

// Ruta para probar la conexión
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente 🚀');
});

// Ruta para registrar un pedido en Google Sheets
app.post('/registrar', async (req, res) => {
    try {
        const { remision, articulo, taller, fecha_despacho, cantidad, referencia, entregas_parciales } = req.body;

        // Aquí iría la lógica para conectar con Google Sheets y guardar los datos

        res.json({ mensaje: "Pedido registrado correctamente ✅" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al registrar el pedido ❌", error });
    }
});

// Ruta para consultar pedidos desde Google Sheets
app.get('/consultar', async (req, res) => {
    try {
        // Aquí iría la lógica para leer datos de Google Sheets
        res.json({ mensaje: "Datos obtenidos correctamente ✅", datos: [] });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los datos ❌", error });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
