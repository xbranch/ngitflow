'use strict';

const GitFlow = require('./git-flow');

class NGitFlow {

    static release(level, cwd) {
        return GitFlow.release(level, cwd);
    }
}

module.exports = NGitFlow;
