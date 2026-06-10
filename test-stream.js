const play = require('play-dl');
const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

async function run() {
  try {
    const stream = await play.stream(url);
    console.log('Stream Keys:', Object.keys(stream));
    console.log('Stream Type:', stream.type);
    console.log('Stream exists?:', !!stream.stream);
  } catch (err) {
    console.error('ERROR:', err);
  }
}

run();
