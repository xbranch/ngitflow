'use strict';

const GitFlow = require('./git-flow');
const Logger = require('./logger');
const Package = require('./package');

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
}

module.exports = NGitFlow;
