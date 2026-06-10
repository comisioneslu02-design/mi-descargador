const play = require('play-dl');
const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
play.video_info(url)
  .then(info => {
    console.log('Available keys on first format:', Object.keys(info.format[0]));
    console.log('Sample format:', JSON.stringify(info.format[0], null, 2));
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
