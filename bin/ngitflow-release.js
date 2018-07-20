#!/usr/bin/env node
'use strict';

const program = require('commander');

const Logger = require('../lib/logger');
const NGitFlow = require('../lib/index');

program
    .arguments('<level>')
    .action((level) => {
        if (['patch', 'minor', 'major'].indexOf(level) >= 0) {
            return NGitFlow.release(level, process.cwd());
        } else {
            return program.help();
        }
    });

program.on('--help', () => {
    Logger.info('');
    Logger.info('  Examples:');
    Logger.info('');
    Logger.info('    $ ngitflow release patch');
    Logger.info('    $ ngitflow release minor');
    Logger.info('    $ ngitflow release major');
    Logger.info('');
});

program.parse(process.argv);
