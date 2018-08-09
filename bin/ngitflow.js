#!/usr/bin/env node
'use strict';

const program = require('commander');
const packageJson = require('../package.json');

const Logger = require('../lib/logger');
const Package = require('../lib/package');
const NGitFlow = require('../lib/index');

program
    .version(packageJson.version, '-v, --version');

program
    .command('versions')
    .option('-a, --all', 'output all versions')
    .action((cmd) => {
        Package.getCurrentVersion()
            .then((version) => Logger.info(version))
            .catch(error => Logger.error(error));
        if (cmd.all) {
            Package.getNextPatchVersion().then((version) => Logger.info(`Next patch version: ${version}`));
            Package.getNextMinorVersion().then((version) => Logger.info(`Next minor version: ${version}`));
            Package.getNextMajorVersion().then((version) => Logger.info(`Next major version: ${version}`));
            Package.getNextSnapshotVersion().then((version) => Logger.info(`Next snapshot version: ${version}`));
        }
    });

program
    .command('init')
    .action(() => {
        NGitFlow.init(process.cwd());
    })
    .on('--help', () => {
        Logger.info('');
        Logger.info('  Examples:');
        Logger.info('');
        Logger.info('    $ ngitflow init');
        Logger.info('');
    });

program
    .command('feature')
    .arguments('<action> [name]')
    .action((action, name) => {
        if (action === 'start') {
            name = name || Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 7);
            NGitFlow.startFeature(name, process.cwd());
        } else if (action === 'finish') {
            NGitFlow.finishFeature(process.cwd());
        } else {
            Logger.error('Error: Invalid action! Valid actions are: start, finish');
        }
    })
    .on('--help', () => {
        Logger.info('');
        Logger.info('  Examples:');
        Logger.info('');
        Logger.info('    $ ngitflow feature start');
        Logger.info('    $ ngitflow feature start firstfeature');
        Logger.info('    $ ngitflow feature finish');
        Logger.info('');
    });

program
    .command('release')
    .arguments('<action> [level]')
    .action((action, level) => {
        if (action === 'start') {
            level = level || 'patch'
            NGitFlow.startRelease(level, process.cwd());
        } else if (action === 'finish') {
            NGitFlow.finishRelease(process.cwd());
        } else {
            Logger.error('Error: Invalid action! Valid actions are: start, finish');
        }
    })
    .on('--help', () => {
        Logger.info('');
        Logger.info('  Examples:');
        Logger.info('');
        Logger.info('    $ ngitflow release start');
        Logger.info('    $ ngitflow release start minor');
        Logger.info('    $ ngitflow release start major');
        Logger.info('    $ ngitflow release finsih');
        Logger.info('');
    });

program.parse(process.argv);
