# Node Git Flow

[![NPM Version](https://badge.fury.io/js/ngitflow.svg)](https://www.npmjs.com/package/ngitflow)
[![Build Status](https://travis-ci.org/xbranch/ngitflow.svg?branch=develop)](https://travis-ci.org/xbranch/ngitflow)
[![Dependency Status](https://david-dm.org/xbranch/ngitflow.svg)](https://david-dm.org/xbranch/ngitflow)
[![NPM Downloads](https://img.shields.io/npm/dm/ngitflow.svg?style=flat)](https://npmcharts.com/compare/ngitflow?minimal=true)
[![Install Size](https://packagephobia.now.sh/badge?p=ngitflow)](https://packagephobia.now.sh/result?p=ngitflow)

A command line node module to deal with git flow

## Requirements
- [git-flow](https://github.com/petervanderdoes/gitflow-avh)

## Installation

```bash
$ npm install ngitflow --save-dev
```

## Usage

```bash
$ ngitflow release -h

  Usage: release [options]

  Options:

    -l, --level [level]  which version to increase patch/minor/major (default: patch)
    -s, --start-only     only start release
    -f, --finish-only    only finish release
    -h, --help           output usage information

  Examples:

    $ ngitflow release
    $ ngitflow release --level minor
    $ ngitflow release -l major
```

### Recommended

You should install it as a dev dependency and then add the following to the `scripts` object in your `package.json`:

```json
"release": "ngitflow release"
```

## License

This project is released under the MIT license, which can be found in [`LICENSE`](LICENSE).
