const express = require('express');
const path = require('path');
const downloadApi = require('./api/download');

const app = express();
const PORT = 3000;

// Servir archivos estáticos (index.html)
app.use(express.static(path.join(__dirname)));

// Simular Vercel Serverless Function
app.get('/api/download', async (req, res) => {
    // Vercel serverless functions reciben req y res
    await downloadApi(req, res);
});

app.listen(PORT, () => {
    console.log(`Servidor local ejecutándose en http://localhost:${PORT}`);
});
