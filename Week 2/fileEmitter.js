// HANDLING THE EVENTS OF FILE CREATING, READING AND DELETING THROUGH EVENTS BECAUSE OF ITS BENEFITS AND SEPARATING THEM AS MODULE FOR CODE READABILITY

const fs = require('fs');       // for file handling
const path = require('path');   // file/folder path handling
const EventEmitter = require('events');     // for event handling

class FileEventEmitter extends EventEmitter{};
const fileEmitter = new FileEventEmitter();     // creating instace of custom event emitter

const logFilePath = path.join(__dirname, 'file-operations.log');    // defining a log file the current working directory to track the file operations

//helper function to write the logs into the file-operations log file
const logToFile = (message) => {
    const now = new Date(); // using date and time to write in the log

    const readableTimeStamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    
    const logMessage = `${readableTimeStamp} - ${message}\n`;

    console.log(logMessage);

    fs.appendFile(logFilePath, logMessage, (err) => {
        if(err){
            console.error('Failed to write log to file', err);
        }
    });
};

// Event Handler for file reading
fileEmitter.on('read', (filePath, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => { // Read the file
        if (err) {
            res.statusCode = 404; // Set the response status code to 404 (Not Found)
            res.end(JSON.stringify({ error: 'File not found' })); // Send an error response
            fileEmitter.emit('log', `Failed to read file: ${filePath}`); // Log the error
        } else {
            res.statusCode = 200; // Set the response status code to 200 (OK)
            res.end(JSON.stringify({ content: data })); // Send the file content in the response
            fileEmitter.emit('log', `File read successfully: ${filePath}`); // Log the successful read, emitting the 'log' handler
        }
    });
});

//Event handler for creating the file
fileEmitter.on('create', (filePath, body, res) => {
    fs.writeFile(filePath, body, err => {
        if (err) {
            res.statusCode = 500; // Set the response status code to 500 (Internal Server Error)
            res.end(JSON.stringify({ error: 'Failed to create file' }));
            fileEmitter.emit('log', `Failed to create file: ${filePath}`);
        } else {
            res.statusCode = 201; // Set the response status code to 201 (Created)
            res.end(JSON.stringify({ message: 'File created successfully' })); 
            fileEmitter.emit('log', `File created successfully: ${filePath}`); 
        }
    });
});

//Event handler for deleting file
fileEmitter.on('delete', (filePath, res) => {
    fs.unlink(filePath, err => { 
        if (err) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'File not found' }));
            fileEmitter.emit('log', `Failed to delete file: ${filePath}`);
        } else {
            res.statusCode = 200;
            res.end(JSON.stringify({ message: 'File deleted successfully' }));
            fileEmitter.emit('log', `File deleted successfully: ${filePath}`);
        }
    });
});

//Event handler for logging the file-operations
fileEmitter.on('log', (message) => {
    logToFile(message); // Log the message to the log file
});

module.exports = fileEmitter; // Export the fileEmitter instance