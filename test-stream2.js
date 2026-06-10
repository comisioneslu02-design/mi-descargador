const play = require('play-dl');

async function testStream() {
    const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    try {
        console.log('Testing play-dl video_info...');
        const info = await play.video_info(url);
        console.log('Got info. Testing stream...');
        const stream = await play.stream_from_info(info);
        console.log('Stream object keys:', Object.keys(stream));
        console.log('Stream url:', stream.url);
    } catch(e) {
        console.error(e);
    }
}
testStream();