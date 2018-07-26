'use strict';

const semver = require('semver');

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
}

module.exports = Version;
