'use strict';

const Files = require('./files');
const VersionUtils = require('./version-utils');
const Utils = require('./utils');

class Package {

    static getUserPackage(cwd) {
        const userPackagePath = `${cwd ? cwd : process.cwd()}/package.json`;
        return Files.exists(userPackagePath)
            .then(() => require(userPackagePath))
            .catch(() => {
                throw new Error('package.json not found');
            });
    }

    static getCurrentVersion() {
        return this.getUserPackage()
            .then((packageJson) => packageJson.version);
    }

    static getNextPatchVersion() {
        return this.getNextVersion('patch');
    }

    static getNextMinorVersion() {
        return this.getNextVersion('minor');
    }

    static getNextMajorVersion() {
        return this.getNextVersion('major');
    }

    static getNextSnapshotVersion() {
        return this.getNextVersion('prerelease', 'snapshot');
    }

    static getNextVersion(level, preid) {
        return this.getCurrentVersion()
            .then((currentVersion) => VersionUtils.increment(currentVersion, level, preid));
    }

    static updateVersion(version, cwd) {
        return Utils.promisedSpawn('npm', ['--no-git-tag-version', '--allow-same-version', 'version', version], false, cwd ? cwd : process.cwd())
            .then(() => version);
    }
}

module.exports = Package;
