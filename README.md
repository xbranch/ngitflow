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

or 

```bash
$ npm install -g ngitflow
```

## Usage


### init
```bash
$ ngitflow init -h

  Usage: init [options]

  Options:

    -h, --help  output usage information

  Examples:

    $ ngitflow init
```

### release
```bash
$ ngitflow release -h

  Usage: release [options] <action> [level]

  Options:
    
    -o, --offline  do not sync with remote
    -h, --help     output usage information

  Examples:

    $ ngitflow release start
    $ ngitflow release start minor
    $ ngitflow release start major
    $ ngitflow release finsih
```

### feature
```bash
$ ngitflow feature -h

  Usage: release [options] <action> [level]

  Options:

    -h, --help  output usage information

  Examples:

    $ ngitflow release start
    $ ngitflow release start minor
    $ ngitflow release start major
    $ ngitflow release finsih
```

### Recommended

You should install it as a dev dependency and then add the following to the `scripts` object in your `package.json`:

```json
"release:start": "ngitflow release start",
"release:finish": "ngitflow release finish",
"release": "ngitflow release start && ngitflow release finish"
```

## Possible .ngitflowrc configuration

```json
{
    "versionFiles": [
        {"file": "src/package.json", "regex": "(\"version\"\\s*:\\s*\")[\\s\\S]*?\",", "replacement": "$1$VERSION\","}
    ]
}
```

`versionFiles` is a list of any files that contains version string and you want to be updated when version in main `package.json` is changed. You simply define path to file, regex of matching string that you want to replace and replacement string that contains `$VERSION` key which is replaced with real version string before replacement in file is made. 

## License

This project is released under the MIT license, which can be found in [`LICENSE`](LICENSE).
