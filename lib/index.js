'use strict';

const GitFlow = require('./git-flow');
const Logger = require('./logger');
const Package = require('./package');
const VersionUtils = require('./version-utils');

class NGitFlow {

    static release(level, cwd) {
        Promise.resolve()
            .then(() => GitFlow.startRelease(level || 'patch', cwd))
            .then(version => GitFlow.finishRelease(version, cwd))
            .catch(error => Logger.error(error));
    }

    static startRelease(level, cwd) {
        GitFlow.startRelease(level, cwd)
            .catch(error => Logger.error(error));
    }

    static finishRelease(version, cwd) {
        Promise.resolve()
            .then(() => Package.getCurrentVersion())
            .then(version => GitFlow.finishRelease(version, cwd))
            .catch(error => Logger.error(error));
    }

    static startFeature(name, cwd) {
        GitFlow.startFeature(name, cwd)
            .catch(error => Logger.error(error));
    }

    static finishFeature(cwd) {
        Promise.resolve()
            .then(() => Package.getCurrentVersion())
            .then(version => VersionUtils.getPreId(version))
            .then(preid => GitFlow.finishFeature(preid, cwd))
            .catch(error => Logger.error(error));
    }
}

module.exports = NGitFlow;
