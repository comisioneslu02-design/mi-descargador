const play = require('play-dl');
const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
play.video_info(url)
  .then(async info => {
    const mp3Formats = info.format.filter(f => f.mimeType && f.mimeType.includes('audio'));
    console.log('Format obj keys:', Object.keys(mp3Formats[0]));
    console.log('Format obj:', mp3Formats[0]);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });