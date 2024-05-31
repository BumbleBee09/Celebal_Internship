const http = require('http');
const url = require('url'); // Import URL module for hanlding query parameters through which the events are decided
const path = require('path');
const fileEmitter = require('./fileEmitter'); // Import the custom FileEventEmitter

const PORT = 3000; 

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true); // Parse the request URL
    const pathname = parsedUrl.pathname; // Get the pathname from the URL
    const query = parsedUrl.query; // Get the query parameters from the URL

    const filePath = path.join(__dirname, query.filename); // Get the file path from combining the current working directory and file name provided

    res.setHeader('Content-Type', 'application/json'); // Set the response header to JSON

    if (req.method === 'GET' && pathname === '/read') {
        fileEmitter.emit('read', filePath, res); // Emit a 'read' event
    
    } else if (req.method === 'POST' && pathname === '/create') {

        let body = ''; // Initialize the body variable
        req.on('data', chunk => {
            body += chunk.toString(); // Accumulate the request body data
        });
        req.on('end', () => {
            fileEmitter.emit('create', filePath, body, res); // Emit a 'create' event
        });
    
    } else if (req.method === 'DELETE' && pathname === '/delete') {

        fileEmitter.emit('delete', filePath, res); // Emit a 'delete' event
    
    } else {
        res.statusCode = 400; // Set the response status code to 400 (Bad Request)
        res.end(JSON.stringify({ error: 'Invalid request' })); // Send an error response
    }
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
