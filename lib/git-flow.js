'use strict';

const Logger = require('./logger');
const Package = require('./package');
const Utils = require('./utils');
const VersionUtils = require('./version-utils');

class GitFlow {

    static startFeature(name, cwd) {
        Logger.info(`Starting git flow feature ${name}...`);
        return Promise.resolve()
            .then(() => Utils.promisedExec(`git flow feature start ${name}`, true, cwd)
                .then(() => name, err => { throw err; })
            )
            .then(() => Package.getCurrentVersion(cwd))
            .then(version => VersionUtils.increment(version, 'prerelease', name))
            .then(version => Package.updateAndCommitVersion(version, cwd));
    }

    static finishFeature(name, cwd) {
        Logger.info(`Finishing git flow feature ${name}...`);
        return Promise.resolve()
            .then(() => Package.getCurrentVersion(cwd))
            .then(version => VersionUtils.increment(version, 'prerelease', 'snapshot'))
            .then(snapshotVersion => Package.updateAndCommitVersion(snapshotVersion, cwd))
            .then(() => Utils.promisedExec(`git flow feature finish ${name}`, true, cwd)
                .then(() => name, err => { throw err; })
            );
    }

    static startRelease(level, cwd) {
        Logger.info('Starting git flow release...');
        return Promise.resolve()
            .then(() => Package.getNextVersion(level))
            .then(nextVersion => Utils.promisedExec(`git flow release start -F ${nextVersion}`, true, cwd)
                .then(() => nextVersion, err => { throw err; })
            )
            .then(nextVersion => Utils.promisedExec(`git flow release publish ${nextVersion}`, true, cwd)
                .then(() => nextVersion, err => { throw err; })
            )
            .then(version => Package.updateAndCommitVersion(version, cwd));
    }

    static finishRelease(version, cwd) {
        Logger.info('Finishing git flow release...');
        return Promise.resolve()
            .then(() => Utils.promisedExec(`git flow release finish -F -m "v${version}" -p "${version}"`, true, cwd)
                .then(() => version, err => { throw err; })
            )
            .then(nextVersion => Utils.promisedExec(`git push --tags`, true, cwd)
                .then(() => nextVersion, err => { throw err; })
            )
            .then(version => VersionUtils.increment(version, 'prerelease', 'snapshot'))
            .then(snapshotVersion => Package.updateAndCommitVersion(snapshotVersion, cwd))
            .then(nextVersion => Utils.promisedExec(`git push`, true, cwd)
                .then(() => nextVersion, err => { throw err; })
            );
    }
}

module.exports = GitFlow;
