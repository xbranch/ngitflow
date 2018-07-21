# Node Git Flow

## Requirements
- [git-flow](https://github.com/petervanderdoes/gitflow-avh)

## Installation

```bash
npm install ngitflow --save-dev
```

## Usage

```bash
$ ngitflow release -h

  Usage: release [options]

  Options:

    -l, --level [level]  which version to increase patch/minor/major (default: patch)
    -h, --help           output usage information

  Examples:

    $ ngitflow release
    $ ngitflow release --level minor
    $ ngitflow release -l major
```
