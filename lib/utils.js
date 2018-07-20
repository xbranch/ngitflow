'use strict';

const childProcess = require('child_process');

const MAX_BUFFER = 1000 * 1000 * 20;

class Utils {

    static promisedExec(command, silent, cwd) {
        return new Promise((resolve, reject) => {
            let instance = childProcess.exec(command, { 'cwd': cwd ? cwd : process.cwd(), 'maxBuffer': MAX_BUFFER }, (error, stdout) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(stdout);
                }
            });
            if (!silent) {
                instance.stdout.on('data', function (data) {
                    console.log(data);
                });
                instance.stderr.on('data', function (data) {
                    console.error(data);
                });
            }
        });
    }

    static promisedSpawn(command, args, silent, cwd) {
        return new Promise((resolve, reject) => {
            let stdout = '';
            let instance = childProcess.spawn(command, args ? args : [], { 'cwd': cwd ? cwd : process.cwd(), 'stdio': 'inherit', 'shell': true, 'maxBuffer': MAX_BUFFER });

            instance.on('data', (data) => {
                stdout += data;

                if (!silent) {
                    console.log(data);
                }
            });
            instance.on('error', reject);
            instance.on('close', (code) => {
                if (code) {
                    reject(code);

                } else {
                    resolve(stdout);
                }
            });
        });
    }
}

module.exports = Utils;
