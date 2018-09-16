'use strict';

const rc = require('rc');
const packageJson = require('../package.json');

const DEFAULTS = {
    versionFiles: []
};

class Configurations {

    static list() {
        const config = rc(packageJson.name, DEFAULTS, []);
        delete config['configs'];
        delete config['config'];
        return config;
    }

    static get(name) {
        return this.list()[name];
    }

    static versionFiles() {
        return this.get('versionFiles') || [];
    }
}

module.exports = Configurations;
