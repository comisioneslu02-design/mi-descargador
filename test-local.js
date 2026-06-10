const http = require('http');
const fs = require('fs');

const url = 'http://localhost:3000/api/download?url=https://www.youtube.com/watch?v=LXb3EKWsInQ&format=mp4';

http.get(url, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  const disposition = res.headers['content-disposition'];
  console.log(`HEADERS: disposition = ${disposition}`);
  let size = 0;
  res.on('data', (chunk) => {
    size += chunk.length;
  });
  res.on('end', () => {
    console.log(`Final size downloaded: ${size} bytes`);
  });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});
