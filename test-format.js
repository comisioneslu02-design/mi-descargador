const ytdl = require('ytdl-core');

async function testD() {
    const info = await ytdl.getInfo('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    const formats = ytdl.filterFormats(info.formats, 'audioandvideo');
    console.log('Combined formats:', formats.length);
    if(formats.length > 0) console.log('First combined format:', formats[0].mimeType);
}
testD();