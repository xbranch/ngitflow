'use strict';

const Logger = require('./logger');
const Package = require('./package');
const Utils = require('./utils');
const Version = require('./version');
const Configurations = require('./rc');

class GitFlow {

    static init(cwd) {
        Logger.info(`Initializing git flow...`);
        return Promise.resolve()
            .then(() => Utils.promisedSpawn(`git flow init`, ['-d'], false, cwd))
            .then(() => Package.getCurrentVersion(cwd))
            .then(version => Version.increment(version, 'prerelease', Configurations.prereleaseId()))
            .then(version => Package.updateAndCommitVersion(version, cwd));
    }

    static startFeature(name, cwd) {
        Logger.info(`Starting git flow feature ${name}...`);
        return Promise.resolve()
            .then(() => Package.getCurrentVersion(cwd))
            .then(version => Version.increment(version, 'prerelease', name))
            .then(version => {
                if (Version.validate(version)) {
                    return version;
                } else {
                    throw new Error('Invalid feature name');
                }
            })
            .then((version) => Utils.promisedExec(`git flow feature start ${name}`, true, cwd)
                .then(() => version, err => {
                    throw err;
                })
            )
            .then(version => Package.updateAndCommitVersion(version, cwd));
    }

    static finishFeature(name, cwd) {
        Logger.info(`Finishing git flow feature ${name}...`);
        return Promise.resolve()
            .then(() => Utils.promisedExec(`git status --porcelain`, true, cwd)
                .then((changes) => {
                    if (changes) {
                        Logger.error('Error: You have uncommitted changes');
                        throw changes;
                    }
                }, () => {
                    throw 'Cannot see status';
                })
            )
            .then(() => Package.getCurrentVersion(cwd))
            .then(version => Version.increment(version, 'prerelease', Configurations.prereleaseId()))
            .then(prereleaseVersion => Package.updateAndCommitVersion(prereleaseVersion, cwd))
            .then(() => Utils.promisedExec(`git flow feature finish ${name}`, true, cwd)
                .then(() => name, err => {
                    throw err;
                })
            ).then(name => Utils.promisedExec(`git push`, true, cwd)
                .then(() => name, err => {
                    throw err;
                })
            );
    }

    static startRelease(levelOrVersion, preId, offline, cwd) {
        Logger.info('Starting git flow release...');
        return Promise.resolve()
            .then(() => {
                if (['patch', 'minor', 'major'].indexOf(levelOrVersion) >= 0) {
                    return Package.getNextVersion(levelOrVersion);
                }
                if (['prerelease'].indexOf(levelOrVersion) >= 0) {
                    return Package.getNextVersion(levelOrVersion, preId);
                }
                return Promise.resolve(levelOrVersion);
            })
            .then(nextVersion => Utils.promisedExec(`git flow release start -F ${nextVersion}`, true, cwd)
                .then(() => nextVersion, err => {
                    throw err;
                })
            )
            .then(nextVersion => offline ? nextVersion : Utils.promisedExec(`git flow release publish ${nextVersion}`, true, cwd)
                .then(() => nextVersion, err => {
                    throw err;
                })
            )
            .then(version => Package.updateAndCommitVersion(version, cwd));
    }

    static finishRelease(version, offline, cwd) {
        Logger.info('Finishing git flow release...');
        return Promise.resolve()
            .then(() => Utils.promisedExec(`git flow release finish -F -m "v${version}" ${offline ? '' : `-p "${version}"`}`, true, cwd)
                .then(() => version, err => {
                    throw err;
                })
            )
            .then(version => Version.increment(version, 'prerelease', Configurations.prereleaseId()))
            .then(prereleaseVersion => Package.updateAndCommitVersion(prereleaseVersion, cwd))
            .then(nextVersion => offline ? nextVersion : Utils.promisedExec(`git push`, true, cwd)
                .then(() => nextVersion, err => {
                    throw err;
                })
            )
            .then(nextVersion => offline ? nextVersion : Utils.promisedExec(`git push --tags`, true, cwd)
                .then(() => nextVersion, err => {
                    throw err;
                })
            );
    }
}

module.exports = GitFlow;
