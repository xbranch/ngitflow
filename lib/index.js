'use strict';

const GitFlow = require('./git-flow');

class NGitFlow {

    static release(level) {
        return GitFlow.release(level);
    }
}

module.exports = NGitFlow;
