# Node Git Flow

[![NPM](https://nodei.co/npm/ngitflow.png?downloads=true&downloadRank=true)](https://nodei.co/npm/ngitflow/)

[![NPM](https://nodei.co/npm-dl/ngitflow.png?&months=6&height=3)](https://nodei.co/npm/ngitflow/)

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
