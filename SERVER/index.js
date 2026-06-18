const http = require('http'); // Built-in module to create a web server

const fs = require('fs'); // Built-in module to work with files

const { error } = require('console'); // Not needed here (can be removed)


// Create an HTTP server
const myServer = http.createServer((request, response) => {

    // Create a log message
    // Example:
    // 1782918181818: /about New Req Received

    const log = `${Date.now()}: ${request.url} New Req Received\n`;


    // Append the log into log.txt
    // This is asynchronous (non-blocking)

    fs.appendFile('log.txt', log, (error, data) => {

        // Handle different routes (URLs)

        switch (request.url) {

            // localhost:8000/

            case '/':
                response.end("Welcome to Homepage");
                break;


            // localhost:8000/about

            case '/about':
                response.end("About page");
                break;


            // localhost:8000/contact

            case '/contact':
                response.end("Contact Us");
                break;


            // Any unknown route

            default:
                response.end("404 page not found");
                break;
        }

    });

    console.log("New request response");

});


// Start server on port 8000

myServer.listen(8000, () => {
    console.log("Server Started!");
});