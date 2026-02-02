const http = require('http');
const url = require('url');
const { getDate } = require('./modules/utils');
const { greeting } = require('./lang/messages/en/user');
const { writeToFile, readFromFile } = require('./modules/FileManager');

const PORT = process.env.PORT || 8888;

// http://localhost:8888/default.htm?name=John&age=23
// host = localhost:8888
// pathname = /default.htm
// query = { name: John, age: 23 }

const server = http.createServer((req,res) => {
    const parsedUrl = url.parse(req.url, true); // true flag to parse query str into key-value obj
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (pathname === '/COMP4537/labs/3/getDate/') {
        const name = query.name;
        const date = getDate();
        const msg = greeting.replace('%1', name);
        const content = `<p style="color:blue;">${msg} ${date}</p>`;

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(content);
    } else if (pathname === '/COMP4537/labs/3/writeFile/') {
        const text = query.text;
        writeToFile('file.txt', text, (err) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.end('<h1>Error Saving to File!</h1>');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end('<h1>Successfully Saved to File!</h1>');
            }
        });
    } else if (pathname.startsWith('/COMP4537/labs/3/readFile/')) {
        const fileName = pathname.split('/').pop(); // split pathname by '/' and return last element
        readFromFile(fileName, (err, data) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end(`<h1>404 File ${fileName} Not Found!</h1>`);
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(`<pre>${data}</pre>`);
            }
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1>404 Not Found!</h1>');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
