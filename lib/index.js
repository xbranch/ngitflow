'use strict';

const GitFlow = require('./git-flow');
const Logger = require('./logger');
const Package = require('./package');
const Version = require('./version');

class NGitFlow {

    static init(cwd) {
        return Promise.resolve()
            .then(() => GitFlow.init(cwd))
            .catch(error => Logger.error(error));
    }

    static startRelease(levelOrVersion, preId, offline, cwd) {
        return Promise.resolve()
            .then(() => GitFlow.startRelease(levelOrVersion, preId, offline, cwd))
            .catch(error => Logger.error(error));
    }

    static finishRelease(offline, cwd) {
        return Promise.resolve()
            .then(() => Package.getCurrentVersion())
            .then(version => GitFlow.finishRelease(version, offline, cwd))
            .catch(error => Logger.error(error));
    }

    static startFeature(name, cwd) {
        return Promise.resolve()
            .then(() => GitFlow.startFeature(name, cwd))
            .catch(error => Logger.error(error));
    }

    static finishFeature(cwd) {
        return Promise.resolve()
            .then(() => Package.getCurrentVersion())
            .then(version => Version.getPreId(version))
            .then(preId => GitFlow.finishFeature(preId, cwd))
            .catch(error => Logger.error(error));
    }

    static bumpVersion(levelOrVersion, preId, cwd) {
        return Promise.resolve()
            .then(() => GitFlow.bumpVersion(levelOrVersion, preId, cwd))
            .catch(error => Logger.error(error));
    }
}

module.exports = NGitFlow;
