const fs = require('fs');

exports.writeToFile = function(fileName, text, callback) {
    fs.appendFile(fileName, text + '\n', (err) => callback(err)); // appendFile returns 1 arg, null if success, error obj if fail
}

exports.readFromFile = function(fileName, callback) {
    fs.readFile(fileName, 'utf8', (err, data) => callback(err, data)); // readFile returns 2 args, null/error obj and file contents/undefined
}