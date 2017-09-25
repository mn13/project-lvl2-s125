#!/usr/bin/env node
import commander from 'commander';
import fs from 'fs';
import path from 'path';
import pjson from '../../package.json';
import parse from '../parse';
import genDiff from '../genDiffLib';

commander
  .version(pjson.version)
  .description(pjson.description)
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const content1 = parse(fs.readFileSync(firstConfig, 'utf-8'), path.extname(firstConfig));
    const content2 = parse(fs.readFileSync(secondConfig, 'utf-8'), path.extname(secondConfig));
    console.log(genDiff(content1, content2));
  })
  .parse(process.argv);
