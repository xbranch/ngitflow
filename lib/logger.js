'use strict';

const chalk = require('chalk');
const log = console.log;

class Logger {

    static success(msg) {
        log(chalk.green(msg));
    }

    static info(msg) {
        log(chalk.blue(msg));
    }

    static error(msg) {
        log(chalk.red(msg));
    }

    static log(msg) {
        log(msg);
    }
}

module.exports = Logger;
