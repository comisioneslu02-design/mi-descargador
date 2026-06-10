async function testCobalt() {
  try {
      console.log('Testing cobalt...');
      const response = await fetch('https://api.cobalt.tools/api/json', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
              vCodec: 'h264',
              isAudioOnly: false,
              isNoTTWatermark: true
          })
      });
      console.log('Status:', response.status);
      const text = await response.text();
      console.log('Body:', text);
  } catch(e) {
      console.error(e);
  }
}
testCobalt();