const http = require('http');

http.get('http://localhost:3000/api/download?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ&format=mp4', (res) => {
    console.log('Status Code:', res.statusCode);
    console.log('Headers:', res.headers);
    
    let size = 0;
    res.on('data', chunk => {
        size += chunk.length;
    });
    
    res.on('end', () => {
        console.log('Downloaded size (bytes):', size);
    });
}).on('error', err => {
    console.error('Request Error:', err);
});