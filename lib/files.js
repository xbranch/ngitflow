'use strict';

const fs = require('fs');
const STDOUT_PATH = '-';

class Files {

    static exists(path) {
        return new Promise((resolve) => fs.stat(path, resolve));
    }

    static readIfExists(path) {
        return fs.readFile(path, 'utf8').catch(() => '');
    }

    static writeToFile(path, data) {
        return Promise.resolve().then(() => {
            if (path === STDOUT_PATH) {
                return fs.writeAsync(process.stdout.fd, data);
            } else {
                return fs.writeFileAsync(path, data);
            }
        });
    }
}

module.exports = Files;
