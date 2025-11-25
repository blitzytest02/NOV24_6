// Node.js server with Express.js
// This server has two endpoints:
// 1. /hello - returns "Hello world"
// 2. /evening - returns "Good evening"

const express = require('express');
const app = express();

const hostname = '127.0.0.1';
const port = 3000;

// Original endpoint - returns "Hello world"
app.get('/hello', (req, res) => {
  res.send('Hello world');
});

// New endpoint - returns "Good evening"
app.get('/evening', (req, res) => {
  res.send('Good evening');
});

// Only start server if this file is run directly (not imported in tests)
if (require.main === module) {
  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

module.exports = app;
