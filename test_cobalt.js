const test = async () => {
  const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Rickroll as a test
  const cobaltUrl = 'https://api.cobalt.tools/';
  
  console.log('Enviando petición a', cobaltUrl);
  
  try {
    const response = await fetch(cobaltUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: JSON.stringify({
        url: url,
        audioFormat: 'mp3',
        downloadMode: 'audio',
        videoQuality: '720',
        filenameStyle: 'basic'
      })
    });
    
    console.log('Status:', response.status);
    console.log('Headers:', Object.fromEntries(response.headers.entries()));
    
    const data = await response.json();
    console.log('Response data:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
};

test();
