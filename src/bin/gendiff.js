#!/usr/bin/env node
import commander from 'commander';
import pjson from '../../package.json';

commander
  .version(pjson.version)
  .description(pjson.description)
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .parse(process.argv);
