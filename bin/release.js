#!/usr/bin/env node
'use strict';

const program = require('commander');

const Logger = require('../lib/logger');
const NGitFlow = require('../lib/index');

program
    .arguments('<level>')
    .action((level, cmd) => {
        if (['patch', 'minor', 'major'].indexOf(level) >= 0) {
            NGitFlow.release(level);
        } else {
            program.help();
            process.exit(1);
        }
    });


program.on('--help', () => {
    Logger.info('');
    Logger.info('  Examples:');
    Logger.info('');
    Logger.info('    $ release patch');
    Logger.info('    $ release minor');
    Logger.info('    $ release major');
    Logger.info('');
});

program.parse(process.argv);

if (program.args.length === 0) {
    program.help();
    process.exit(1);
}
