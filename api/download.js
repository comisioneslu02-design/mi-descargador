module.exports = async (req, res) => {
  const { url, format } = req.query;

  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (!url) {
    return res.status(400).json({ error: 'URL de YouTube inválida.' });
  }

  // Validación básica del enlace
  if (!url.includes('youtube.com/') && !url.includes('youtu.be/')) {
    return res.status(400).json({ error: 'La URL proporcionada no es un enlace válido de YouTube.' });
  }

  try {
    // Configurar la petición al motor público y libre de bloqueos de Cobalt API
    const cobaltUrl = 'https://api.cobalt.tools/';
    const body = {
      url: url,
      filenameStyle: 'basic'
    };
    
    if (format === 'mp3') {
      body.downloadMode = 'audio';
      body.audioFormat = 'mp3';
    } else {
      body.videoQuality = '1080';
      body.youtubeVideoCodec = 'h264';
    }

    const response = await fetch(cobaltUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Error de API externa:', errText);
      throw new Error(`El servidor de descargas está saturado (Status: ${response.status}). Intenta de nuevo en unos minutos.`);
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.error?.code || 'Error desconocido en el servidor de descargas');
    }

    if (data.url) {
      // Devolver la URL de descarga externa directamente al frontend
      // Esto ahorra memoria RAM del celular y no usa el ancho de banda del servidor Render
      return res.status(200).json({ downloadUrl: data.url, filename: data.filename || 'descarga' });
    } else {
      throw new Error('El servidor de descargas no devolvió un enlace válido.');
    }

  } catch (error) {
    console.error('Error al procesar el video:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Fallo al procesar: ' + (error.message || error.toString()) });
    }
  }
};
