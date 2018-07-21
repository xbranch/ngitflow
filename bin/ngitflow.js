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
    .option('-a, --all', 'All versions')
    .action((cmd) => {
        Package.getCurrentVersion().then((version) => Logger.info(version));
        if (cmd.all) {
            Package.getNextPatchVersion().then((version) => Logger.info(`Next patch version: ${version}`));
            Package.getNextMinorVersion().then((version) => Logger.info(`Next minor version: ${version}`));
            Package.getNextMajorVersion().then((version) => Logger.info(`Next major version: ${version}`));
            Package.getNextSnapshotVersion().then((version) => Logger.info(`Next snapshot version: ${version}`));
        }
    });

program
    .command('release')
    .option('-l, --level [level]', 'which version to increase patch/minor/major', /^(patch|minor|major)$/i, 'patch')
    .action((cmd) => {
        NGitFlow.release(cmd.level, process.cwd());
    })
    .on('--help', () => {
        Logger.info('');
        Logger.info('  Examples:');
        Logger.info('');
        Logger.info('    $ ngitflow release');
        Logger.info('    $ ngitflow release --level minor');
        Logger.info('    $ ngitflow release -l major');
        Logger.info('');
    });

program.parse(process.argv);
