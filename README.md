# Node Git Flow

[![NPM Version](https://badge.fury.io/js/ngitflow.svg)](https://www.npmjs.com/package/ngitflow)
[![Build Status](https://travis-ci.org/xbranch/ngitflow.svg?branch=develop)](https://travis-ci.org/xbranch/ngitflow)
[![Dependency Status](https://david-dm.org/xbranch/ngitflow.svg)](https://david-dm.org/xbranch/ngitflow)
[![NPM Downloads](https://img.shields.io/npm/dm/ngitflow.svg?style=flat)](https://npmcharts.com/compare/ngitflow?minimal=true)
[![Install Size](https://packagephobia.now.sh/badge?p=ngitflow)](https://packagephobia.now.sh/result?p=ngitflow)

A command line node module to deal with git flow

## Requirements
- [git-flow (AVH Edition)](https://github.com/petervanderdoes/gitflow-avh)

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

Initialize `git-flow` repository structure. Create `master` and `develop` branches. You should set your develop branch as a default branch in your git hosting service provider. 

```bash
$ ngitflow init -h

  Usage: init [options]

  Options:

    -h, --help  output usage information

  Examples:

    $ ngitflow init
```

### release

Create a new release branch and bump `package.json` version. Example `1.0.1-snapshot.0` becomes `1.0.1` in release branch. After release finish a new tag is created and merged back to develop and master. Version becomes `1.0.2-snapshot` on develop but on master stays `1.0.1`.

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

Create a new feature branch and bump `package.json` version. Example `1.0.1-snapshot.0` becomes `1.0.1-firstfeature.0`. After feature finish all changes are merged back to develop and version is changed back to snapshot.

```bash
$ ngitflow feature -h

  Usage: feature [options] <action> [name]

  Options:

    -h, --help  output usage information

  Examples:

    $ ngitflow feature start
    $ ngitflow feature start firstfeature
    $ ngitflow feature finish
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
        {"file": "projects/core/package.json", "regex": "(\"version\"\\s*:\\s*\")[\\s\\S]*?\",", "replacement": "$1$VERSION\","}
    ]
}
```

`versionFiles` is a list of any files that contains version string and you want to be updated when version in main `package.json` is changed. You simply define path to file, regex of matching string that you want to replace and replacement string that contains `$VERSION` key which is replaced with real version string before replacement in file is made. 

## License

This project is released under the MIT license, which can be found in [`LICENSE`](LICENSE).
