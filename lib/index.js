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

    static startRelease(level, cwd) {
        return Promise.resolve()
            .then(() => GitFlow.startRelease(level, cwd))
            .catch(error => Logger.error(error));
    }

    static finishRelease(cwd) {
        return Promise.resolve()
            .then(() => Package.getCurrentVersion())
            .then(version => GitFlow.finishRelease(version, cwd))
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
            .then(preid => GitFlow.finishFeature(preid, cwd))
            .catch(error => Logger.error(error));
    }
}

module.exports = NGitFlow;
