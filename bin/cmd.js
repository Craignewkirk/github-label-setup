#!/usr/bin/env node
'use strict';
const meow = require("meow");
const setup = require("../lib/github-label-setup");

const cli = meow(`
    Usage
      $ github-label-setup --token xxx

    Options

      -h, --help                  output usage information
      -l, --labels <path>         the path to look for the label configuration in. Default: labels.json
      --token <token>  a GitHub access token (also settable with a GITHUB_ACCESS_TOKEN environment variable)
      -d, --dry-run               calculate the required label changes but do not apply them
      -A, --allow-added-labels    allow additional labels in the repo, and don't delete them

`, {

    flags: {
        dryRun: {
            type: 'boolean',
            alias: 'd'
        },
        labels: {
            type: 'string',
            alias: 'l'
        },
        allowAddedLabels: {
            type: 'boolean',
            alias: 'A'
        }
    }
});
/*
 {
 input: ['unicorns'],
 flags: {rainbow: true},
 ...
 }
 */

setup(cli.flags).catch(function(error){
    console.error(error);
    cli.showHelp();
});
