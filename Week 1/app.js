const http = require('http');

const PORT = 8080;

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });

    res.write("Hello World");
    res.end();
});

server.listen(PORT, (err) => {
    if (err) {
        return console.error('Error starting server:', err);
    }
    console.log(`Server is listening on port ${PORT}`);
});
