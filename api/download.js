const youtubedl = require('youtube-dl-exec');
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

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

  const uniqueId = crypto.randomBytes(8).toString('hex');
  const tmpDir = os.tmpdir();
  
  try {
    // 1. Obtener la información del video para saber el título
    const info = await youtubedl(url, { dumpJson: true, noCheckCertificates: true, noWarnings: true });
    let title = info.title ? info.title.replace(/[^\w\s-]/gi, '') : 'Video';
    if (!title) title = 'Descarga';

    let args = {
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: [
        'referer:youtube.com',
        'user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      ],
      extractorArgs: "youtube:player_client=ios,tv,web"
    };

    let ext = '';
    let outputPath = '';

    if (format === 'mp3') {
      ext = 'mp3';
      // %(ext)s le dice a yt-dlp que use la extensión del formato extraído
      outputPath = path.join(tmpDir, `${uniqueId}.%(ext)s`);
      args.f = 'bestaudio/best';
      args.extractAudio = true;
      args.audioFormat = 'mp3';
      args.o = outputPath;
    } else {
      ext = 'mp4';
      outputPath = path.join(tmpDir, `${uniqueId}.%(ext)s`);
      // Priorizar explícitamente el códec H.264 (avc) para evitar AV1/VP9 que no se ven en algunos celulares/PCs
      args.f = 'bestvideo[vcodec^=avc]+bestaudio[ext=m4a]/best[vcodec^=avc]/best[ext=mp4]/best';
      args.mergeOutputFormat = 'mp4';
      args.o = outputPath;
    }

    const finalFilePath = path.join(tmpDir, `${uniqueId}.${ext}`);
    console.log(`Iniciando descarga a temporal: ${finalFilePath}`);

    // 2. Ejecutar yt-dlp para descargar y transcodificar al archivo temporal
    await youtubedl(url, args);

    // 3. Verificar que el archivo existe
    if (!fs.existsSync(finalFilePath)) {
      throw new Error(`El archivo generado no se encontró: ${finalFilePath}`);
    }

    console.log(`Descarga finalizada, enviando al cliente: ${finalFilePath}`);

    // 4. Enviar el archivo real al cliente (esto corrige el error del archivo en blanco de 0 bytes)
    const filename = `${title}.${ext}`;
    res.download(finalFilePath, filename, (err) => {
      if (err) {
        console.error('Error al enviar archivo al cliente:', err);
      }
      // Limpiar archivo temporal para no llenar el disco duro
      if (fs.existsSync(finalFilePath)) {
        fs.unlinkSync(finalFilePath);
      }
    });

  } catch (error) {
    console.error('Error al procesar el video:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Fallo yt-dlp: ' + (error.message || error.toString()) });
    }
  }
};
