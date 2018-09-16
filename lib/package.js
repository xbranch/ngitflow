'use strict';

const path = require('path');

const Files = require('./files');
const Version = require('./version');
const Utils = require('./utils');
const Configurations = require('./rc');

class Package {

    static getUserPackage(cwd) {
        const userPackagePath = `${cwd ? cwd : process.cwd()}/package.json`;
        return Files.exists(userPackagePath)
            .then(() => require(userPackagePath))
            .catch(() => {
                throw new Error('package.json not found');
            });
    }

    static getCurrentVersion(cwd) {
        return this.getUserPackage(cwd)
            .then(packageJson => packageJson.version);
    }

    static getNextPatchVersion(cwd) {
        return this.getNextVersion('patch', null, cwd);
    }

    static getNextMinorVersion(cwd) {
        return this.getNextVersion('minor', null, cwd);
    }

    static getNextMajorVersion(cwd) {
        return this.getNextVersion('major', null, cwd);
    }

    static getNextSnapshotVersion(cwd) {
        return this.getNextVersion('prerelease', 'snapshot', cwd);
    }

    static getNextVersion(level, preid, cwd) {
        return this.getCurrentVersion(cwd)
            .then(currentVersion => Version.increment(currentVersion, level, preid));
    }

    static updateVersion(version, cwd) {
        return Utils.promisedSpawn('npm', ['--no-git-tag-version', '--allow-same-version', 'version', version], false, cwd)
            .then(() => {
                const updates = [];
                Configurations.versionFiles().forEach(descriptor => {
                    updates.push(Version.updateInFile(descriptor, version));
                });
                return Promise.all(updates).then(() => version);
            })
            .then(() => version);
    }

    static updateAndCommitVersion(version, cwd) {
        return this.updateVersion(version, cwd)
            .then(version => {
                const jsonFilesToAdd =
                    Configurations.versionFiles().map(descriptor => path.join(cwd ? cwd : process.cwd(), descriptor.file)).join(' ');
                return Utils.promisedExec(`git add ${cwd ? cwd : process.cwd()}/package*.json ${jsonFilesToAdd}`, true, cwd)
                    .then(() => version, err => {
                        throw err;
                    });
            })
            .then(version => Utils.promisedExec(`git commit -m "Bumping version to ${version}"`, true, cwd)
                .then(() => version, err => {
                    throw err;
                })
            );
    }
}

module.exports = Package;
