const play = require('play-dl');
const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
play.video_info(url)
  .then(async info => {
    console.log('Title:', info.video_details.title);
    
    // Test MP3 path
    const mp3Formats = info.format.filter(f => f.mimeType && f.mimeType.includes('audio'));
    console.log('MP3 Formats found:', mp3Formats.length);
    if (mp3Formats.length > 0) {
      console.log('First MP3 Format URL sample:', mp3Formats[0].url.substring(0, 60) + '...');
    }

    // Test MP4 path
    const mp4Formats = info.format.filter(f => f.mimeType && f.mimeType.includes('video/mp4'));
    console.log('MP4 Formats found:', mp4Formats.length);
    if (mp4Formats.length > 0) {
      console.log('First MP4 Format URL sample:', mp4Formats[0].url.substring(0, 60) + '...');
    }
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
