'use strict';

const semver = require('semver');

class VersionUtils {

    static increment(version, level, preid) {
        return semver.inc(version, level, preid);
    }
}

module.exports = VersionUtils;
