'use strict';

const semver = require('semver');
const replace = require('replace');

class Version {

    static increment(version, level, preid) {
        return semver.inc(version, level, preid);
    }

    static validate(version) {
        return semver.valid(version);
    }

    static getPreId(version) {
        const prerelease = semver.prerelease(version);
        return prerelease.length >= 1 && prerelease[0];
    }

    static updateInFile(descriptor, version) {
        return new Promise((resolve) => {
            replace({
                regex: descriptor.regex,
                replacement: descriptor.replacement.replace('$VERSION', version),
                paths: [descriptor.file],
                recursive: false,
                silent: true
            });
            resolve();
        });
    }
}

module.exports = Version;
