const play = require('play-dl');
const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
play.video_info(url)
  .then(info => {
    const mp3Formats = info.format.filter(f => f.mimeType && f.mimeType.includes('audio'));
    console.log('MP3 formats length:', mp3Formats.length);
    console.log('First MP3 format keys:', Object.keys(mp3Formats[0]));
    console.log('First MP3 format URL:', mp3Formats[0].url);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
