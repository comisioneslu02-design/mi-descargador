const ytdl = require('ytdl-core');

async function testYtdl() {
    const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    try {
        console.log('Testing ytdl-core...');
        const info = await ytdl.getInfo(url);
        console.log('Title:', info.videoDetails.title);
        
        const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
        console.log('Audio URL:', audioFormat.url ? 'Found' : 'Missing');
        console.log('Success!');
    } catch(e) {
        console.error(e);
    }
}
testYtdl();