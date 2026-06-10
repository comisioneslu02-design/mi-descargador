const youtubedl = require('youtube-dl-exec');
const fs = require('fs');

async function test() {
  const url = 'https://www.youtube.com/watch?v=LXb3EKWsInQ'; // Usually has 4k, AV1, VP9, etc.
  try {
    const info = await youtubedl(url, { 
      dumpJson: true, 
      f: 'bestvideo[vcodec^=avc]+bestaudio[ext=m4a]/best[vcodec^=avc]/best[ext=mp4]/best'
    });
    console.log("Codec selected:", info.vcodec, info.acodec, info.ext);
  } catch (err) {
    console.error(err);
  }
}
test();