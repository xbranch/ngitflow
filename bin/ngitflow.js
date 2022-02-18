#!/usr/bin/env node
'use strict';

const program = require('commander');
const packageJson = require('../package.json');

const Logger = require('../lib/logger');
const Package = require('../lib/package');
const NGitFlow = require('../lib/index');
const Configurations = require('../lib/rc');

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
            Package.getNextPrereleaseVersion().then((version) => Logger.info(`Next prerelease version: ${version}`));
        }
    });

program
    .command('config')
    .option('-l, --list', 'list config')
    .action((cmd) => {
        if (cmd.list) {
            Logger.info(JSON.stringify(Configurations.list(), null, '\t'));
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
    .arguments('<action> [levelOrVersion]')
    .option('-o, --offline', 'do not sync with remote')
    .option('-pi, --pre-id [preId]', 'prerelease id value (only for prerelease)')
    .action((action, levelOrVersion, cmd) => {
        if (action === 'start') {
            levelOrVersion = levelOrVersion || 'patch';
            NGitFlow.startRelease(levelOrVersion, cmd.preId, cmd.offline, process.cwd());
        } else if (action === 'finish') {
            NGitFlow.finishRelease(cmd.offline, process.cwd());
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
        Logger.info('    $ ngitflow release start 1.15.0');
        Logger.info('    $ ngitflow release start 1.15.0-alpha.0');
        Logger.info('    $ ngitflow release start prerelease --pre-id rc');
        Logger.info('    $ ngitflow release finsih');
        Logger.info('');
    });

program.parse(process.argv);
