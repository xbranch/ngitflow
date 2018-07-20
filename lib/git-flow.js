'use strict';

const Logger = require('./logger');
const Package = require('./package');
const Utils = require('./utils');

class GitFlow {

    static startRelease(level) {
        Logger.info('Starting git flow release...');
        return Promise.resolve()
            .then(() => Package.getNextVersion(level))
            .then((nextVersion) => Utils.promisedExec(`git flow release start ${nextVersion}`, true)
                .then(() => nextVersion, err => { throw err; })
            )
            .then((nextVersion) => Utils.promisedExec(`git flow release publish ${nextVersion}`, true)
                .then(() => nextVersion, err => { throw err; })
            )
            .then((version) => Package.updateVersion(version))
            .then((nextVersion) => Utils.promisedExec(`git add package.json package-lock.json`, true)
                .then(() => nextVersion, err => { throw err; })
            ).then((nextVersion) => Utils.promisedExec(`git commit -m "Bumping version to ${nextVersion}"`, true)
                .then(() => nextVersion, err => { throw err; })
            );
    }

    static finishRelease(version) {
        Logger.info('Finishing git flow release...');
        return Promise.resolve()
            .then(() => Utils.promisedExec(`git flow release finish -m "v${version}" -p "${version}"`, true)
                .then(() => version, err => { throw err; })
            );
    }

    static release(level) {
        level = level || 'patch';
        return Promise.resolve()
            .then(() => Utils.promisedExec('export GIT_MERGE_AUTOEDIT=no')) // prevernt git flow from opening an editor
            .then(() => this.startRelease(level))
            .then((version) => this.finishRelease(version))
            .then(() => Package.getNextSnapshotVersion())
            .then((snapshotVersion) => Package.updateVersion(snapshotVersion))
            .then(() => Utils.promisedExec('unset GIT_MERGE_AUTOEDIT'))
            .catch((error) => {
                Utils.promisedExec('unset GIT_MERGE_AUTOEDIT')
                Logger.error(error)
            });
    }
}

module.exports = GitFlow;
