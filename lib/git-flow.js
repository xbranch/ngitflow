'use strict';

const Logger = require('./logger');
const Package = require('./package');
const Utils = require('./utils');

class GitFlow {

    static startRelease(level, cwd) {
        Logger.info('Starting git flow release...');
        return Promise.resolve()
            .then(() => Package.getNextVersion(level))
            .then((nextVersion) => Utils.promisedExec(`git flow release start ${nextVersion}`, true, cwd)
                .then(() => nextVersion, err => { throw err; })
            )
            .then((nextVersion) => Utils.promisedExec(`git flow release publish ${nextVersion}`, true, cwd)
                .then(() => nextVersion, err => { throw err; })
            )
            .then((version) => Package.updateAndCommitVersion(version, cwd));
    }

    static finishRelease(version, cwd) {
        Logger.info('Finishing git flow release...');
        return Promise.resolve()
            .then(() => Utils.promisedExec(`git flow release finish -m "v${version}" -p "${version}"`, true, cwd)
                .then(() => version, err => { throw err; })
            )
            .then((nextVersion) => Utils.promisedExec(`git push --tags`, true, cwd)
                .then(() => nextVersion, err => { throw err; })
            );
    }

    static release(level, cwd) {
        level = level || 'patch';
        return Promise.resolve()
            .then(() => Utils.promisedExec('export GIT_MERGE_AUTOEDIT=no', false, cwd)) // prevernt git flow from opening an editor
            .then(() => this.startRelease(level, cwd))
            .then((version) => this.finishRelease(version, cwd))
            .then(() => Package.getNextSnapshotVersion(cwd))
            .then((snapshotVersion) => Package.updateAndCommitVersion(snapshotVersion, cwd))
            .then(() => Utils.promisedExec('unset GIT_MERGE_AUTOEDIT', false, cwd))
            .catch((error) => {
                Utils.promisedExec('unset GIT_MERGE_AUTOEDIT', false, cwd)
                Logger.error(error)
            });
    }
}

module.exports = GitFlow;
