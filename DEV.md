# Development cheatsheet

## Test local version

Run `npm link` inside root folder and your `ngitflow` command will be linked to local/development version.

## Release snapshot version

Run `npm publish --tags snapshot` to publish snapshot version

## Release production version

1. Start release patch/minor/major
2. Finish release
3. New version should be published automatically due to travis configuration (deploys each tag)
