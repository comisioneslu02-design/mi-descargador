const ytdl = require('ytdl-core-enhanced');

async function testD() {
    try {
        const info = await ytdl.getInfo('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        const formats = ytdl.filterFormats(info.formats, 'audioandvideo');
        console.log('Combined formats:', formats.length);
        if(formats.length > 0) {
            console.log('First combined format URL:', formats[0].url.substring(0, 50));
        }
    } catch (e) {
        console.error(e);
    }
}
testD();