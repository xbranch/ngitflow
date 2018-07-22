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
    .command('feature')
    .option('-n, --branch-name [branch-name]', 'git flow feature name')
    .option('-s, --start-only', 'only start release')
    .option('-f, --finish-only', 'only finish release')
    .action((cmd) => {
        if (cmd.startOnly && cmd.branchName) {
            NGitFlow.startFeature(cmd.branchName, process.cwd());
        } else if (cmd.finishOnly) {
            NGitFlow.finishFeature(process.cwd());
        } else {
            Logger.error('Unknown command')
        }
    })
    .on('--help', () => {
        Logger.info('');
        Logger.info('  Examples:');
        Logger.info('');
        Logger.info('    $ ngitflow feature -s -n firstfeature');
        Logger.info('    $ ngitflow feature -f');
        Logger.info('');
    });

program
    .command('release')
    .option('-l, --level [level]', 'which version to increase patch/minor/major', /^(patch|minor|major)$/i, 'patch')
    .option('-s, --start-only', 'only start release')
    .option('-f, --finish-only', 'only finish release')
    .action((cmd) => {
        if (cmd.startOnly) {
            NGitFlow.startRelease(cmd.level, process.cwd());
        } else if (cmd.finishOnly) {
            Package.getCurrentVersion()
                .then((version) => NGitFlow.finishRelease(version, process.cwd()));
        } else {
            NGitFlow.release(cmd.level, process.cwd());
        }
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
