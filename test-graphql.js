const http = require('http');

const data = JSON.stringify({
  query: `{
    collections {
      name
      documents {
        totalCount
        edges {
          node {
            ... on Document {
              _sys {
                filename
                relativePath
              }
            }
          }
        }
      }
    }
  }`
});

const options = {
  hostname: 'localhost',
  port: 4001,
  path: '/graphql',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  let body = '';
  res.on('data', d => { body += d; });
  res.on('end', () => {
    console.log("Status:", res.statusCode);
    console.log("Response:", JSON.stringify(JSON.parse(body), null, 2));
  });
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
