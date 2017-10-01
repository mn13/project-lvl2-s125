#!/usr/bin/env node
import commander from 'commander';
import pjson from '../../package.json';
import genDiff from '../genDiffLib';

commander
  .version(pjson.version)
  .description(pjson.description)
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, commander.format));
  })
  .parse(process.argv);
