const http = require('http'); // Module to create server

const fs = require('fs'); // Module to work with files

const url = require('url'); // Module to parse URLs



// Create HTTP server

const myServer = http.createServer((request, response) => {

    // Create log entry

    const log = `${Date.now()}: ${request.url} New Req Received\n`;


    // Parse incoming URL

    // Example:
    // /about?myname=shiva

    const myUrl = url.parse(request.url, true);
    console.log(myUrl)

    // Save request information inside log.txt

    fs.appendFile('log.txt', log, (error) => {

        if (error) {
            response.end("Something went wrong");
            return;
        }


        // Route handling

        switch (myUrl.pathname) {

            // localhost:8000/

            case '/':

                response.end("Welcome to Homepage");

                break;



            // localhost:8000/about?myname=shiva

            case '/about':

                // Read query parameter

                const username = myUrl.query.myname;

                response.end(`Hey there ${username}`);

                break;



            // localhost:8000/contact

            case '/contact':

                response.end("Contact Us");

                break;



            // Unknown routes

            default:

                response.end("404 page not found");

        }

    });


    console.log("New request response");

});



// Start server

myServer.listen(8000, () => {

    console.log("Server Started!");

});